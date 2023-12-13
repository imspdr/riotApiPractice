import { makeAutoObservable, runInAction } from "mobx";
import { RiotAPI } from "./api";
import { lolUser, participant } from "./types";

class LolMainStore {
  public nowUsers: lolUser[];

  private __windowWidth: number;
  private __nowIndex: number;

  private __nowName: string;
  private __loading: boolean;
  private __showResult: boolean;

  constructor(width: number) {
    this.__nowName = "";
    this.__showResult = false;
    this.__loading = false;
    this.__nowIndex = 0;
    this.__windowWidth = width;

    this.nowUsers = [];

    makeAutoObservable(this);
  }
  get nowName() {
    return this.__nowName;
  }
  get showResult() {
    return this.__showResult;
  }
  get loading() {
    return this.__loading;
  }
  get nowIndex() {
    return this.__nowIndex;
  }
  get windowWidth() {
    return this.__windowWidth;
  }
  set nowIndex(num: number) {
    this.__nowIndex = num;
  }
  set windowWidth(num: number) {
    this.__windowWidth = num;
  }
  set nowName(name: string) {
    this.__nowName = name;
  }
  set showResult(bool: boolean) {
    if (!bool) {
      this.nowUsers = [];
    }
    this.__showResult = bool;
  }
  set loading(bool: boolean) {
    this.__loading = bool;
  }

  updateToken = async (key: string, password: string) => {
    if (key.length > 0 && password.length > 0) {
      const ret = await RiotAPI.updateToken(key, password);
      if (ret && ret.status === "success") {
        return "success";
      }
    } else {
      return "fail";
    }
  };

  onSearch = async (name: string) => {
    if (name.length > 0) {
      this.showResult = true;
      this.loading = true;

      const ind = this.nowUsers.findIndex((user: lolUser) => user.name === name);
      if (ind >= 0) {
        runInAction(() => {
          this.nowUsers = this.nowUsers.filter((user: lolUser) => {
            return user.name !== name;
          });
        });
      }

      const userInfo = await RiotAPI.getPuuid(name);
      if (userInfo) {
        const userid = userInfo.userid;
        const puuid = userInfo.puuid;
        const mostInfo = await RiotAPI.getMost(puuid);
        const tierList = await RiotAPI.getTier(userid);
        const matchList = await RiotAPI.getMatchList(puuid, 0, 10);

        runInAction(() => {
          if (mostInfo && tierList) {
            this.nowUsers = [
              {
                puuid: puuid,
                id: userid,
                name: name,
                mosts: mostInfo,
                tierList: tierList,
                lastGames: [],
              },
              ...this.nowUsers.slice(0, 9),
            ];
            this.nowIndex = 0;
          } else {
            this.nowIndex = -1;
          }
          this.loading = false;
        });

        if (mostInfo && tierList && matchList) {
          for (let i = 0; i < matchList.length; i++) {
            if (matchList[i]) {
              const participants = await RiotAPI.getMatchInfo(matchList[i]!);
              runInAction(() => {
                if (participants) {
                  const me = participants.find((part: participant) => part.name === name);
                  if (me) {
                    const thisgame = {
                      myPlay: {
                        kill: me.kill,
                        death: me.death,
                        assist: me.assist,
                        win: me.win,
                        championName: me.championName,
                      },
                      participants: participants,
                    };
                    this.nowUsers = this.nowUsers.map((user: lolUser) => {
                      if (user.name === name) {
                        return {
                          ...user,
                          lastGames: [...user.lastGames, thisgame],
                        };
                      } else {
                        return user;
                      }
                    });
                  }
                }
              });
            }
          }
        }
      } else {
        this.loading = false;
        this.nowIndex = -1;
      }
    }
  };
  getMoreMatch = async () => {
    const nowUser = this.nowUsers[this.nowIndex];
    if (nowUser) {
      const puuid = nowUser.puuid;
      const name = nowUser.name;
      const matchList = await RiotAPI.getMatchList(puuid, nowUser.lastGames.length, 10);
      if (matchList) {
        for (let i = 0; i < matchList.length; i++) {
          if (matchList[i]) {
            const participants = await RiotAPI.getMatchInfo(matchList[i]!);
            runInAction(() => {
              if (participants) {
                const me = participants.find((part: participant) => part.name === name);
                if (me) {
                  const thisgame = {
                    myPlay: {
                      kill: me.kill,
                      death: me.death,
                      assist: me.assist,
                      win: me.win,
                      championName: me.championName,
                    },
                    participants: participants,
                  };
                  this.nowUsers = this.nowUsers.map((user: lolUser) => {
                    if (user.name === name) {
                      return {
                        ...user,
                        lastGames: [...user.lastGames, thisgame],
                      };
                    } else {
                      return user;
                    }
                  });
                }
              }
            });
          }
        }
      }
    }
  };
}

export default LolMainStore;
