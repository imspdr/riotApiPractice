import axios from "axios";
import { tierInfo, participant, most } from "./types";
import id2name from "./id2name.json";

type idname = {
  id: number;
  name: string;
};
type tempMost = {
  champ: number;
  point: number;
};

const BASEURL = "/back/riot";

export const RiotAPI = {
  getPuuid: async (name: string) => {
    const ret = await axios({
      method: "get",
      url: BASEURL + `/puuid/${encodeURIComponent(name)}`,
    })
      .then((data: any) => {
        return data.data;
      })
      .catch((e) => undefined);

    if (ret && ret.status === "success") {
      return {
        puuid: ret.puuid,
        userid: ret.userid,
      };
    } else {
      return undefined;
    }
  },
  getMatchList: async (puuid: string, start: number, count: number) => {
    const ret = await axios({
      method: "get",
      url: BASEURL + `/matchIds/${encodeURIComponent(puuid)}/${start}/${count}`,
    })
      .then((data: any) => {
        return data.data;
      })
      .catch((e) => undefined);

    if (ret && ret.status === "success") {
      return ret.matchList as string[];
    } else {
      return undefined;
    }
  },
  getTier: async (userid: string) => {
    const ret = await axios({
      method: "get",
      url: BASEURL + `/tier/${encodeURIComponent(userid)}`,
    })
      .then((data: any) => {
        return data.data;
      })
      .catch((e) => undefined);

    if (ret && ret.status === "success") {
      return ret.tierList as tierInfo[];
    } else {
      return undefined;
    }
  },
  getMatchInfo: async (matchId: string) => {
    const ret = await axios({
      method: "get",
      url: BASEURL + `/match/${encodeURIComponent(matchId)}`,
    })
      .then((data: any) => {
        return data.data;
      })
      .catch((e) => undefined);

    if (ret && ret.status === "success") {
      return ret.participants as participant[];
    } else {
      return undefined;
    }
  },
  getMost: async (puuid: string) => {
    const ret = await axios({
      method: "get",
      url: BASEURL + `/most/${encodeURIComponent(puuid)}`,
    })
      .then((data: any) => {
        return data.data;
      })
      .catch((e) => undefined);

    if (ret && ret.status === "success") {
      let mosts = ret.mosts;
      return mosts.map((mo: tempMost) => {
        const find = id2name.find((idname: idname) => idname.id === mo.champ);
        return {
          champ: find ? find.name : "not found",
          point: mo.point,
        };
      });
    } else {
      return undefined;
    }
  },
  updateToken: async (token: string, password: string) => {
    const ret = await axios({
      method: "post",
      url: BASEURL + `/updateKey`,
      params: {
        token: token,
        password: password,
      },
    })
      .then((data: any) => {
        return data.data;
      })
      .catch(() => undefined);
    return ret;
  },
};

