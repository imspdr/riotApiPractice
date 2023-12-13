import requests
from flask import Blueprint, request


p3_riot = Blueprint('riot', __name__, url_prefix='/riot')

RIOTKEY = "RGAPI-72e763f4-0992-4114-baf6-69ca40311016"

url_kr = "https://kr.api.riotgames.com/"
url_asia = "https://asia.api.riotgames.com/"

############ DEFINE API #######################################

@p3_riot.route("/updateKey", methods=["POST"])
def update_key():
    global RIOTKEY
    key = request.args.get("token")
    password = request.args.get("password")
    print(key)
    print(password)

    if password == "updatetoken":
        summoner = "lol/summoner/v4/summoners/by-name/"
        header = {"X-Riot-Token": key}
        summoner_response = requests.get(
            url_kr + summoner + "imspdr", headers=header
        ).json()
        print(summoner_response)
        puuid = summoner_response["puuid"]
        userid = summoner_response["id"]
        RIOTKEY = key
        return {
            "status": "success",
        }
    else:
        return {
            "status": "error",
        }

@p3_riot.route("/puuid/<name>", methods=["GET"])
def get_puuid(name):
    summoner = "lol/summoner/v4/summoners/by-name/"
    header = {"X-Riot-Token": RIOTKEY}

    # puuid 찾기
    try:
        summoner_response = requests.get(
            url_kr + summoner + name, headers=header
        ).json()
        print(summoner_response)
        puuid = summoner_response["puuid"]
        userid = summoner_response["id"]
        return {
            "status": "success",
            "puuid": puuid,
            "userid": userid,
        }
    except KeyError:
        return {
            "status": "error",
        }
    except TypeError:
        return {
            "status": "error",
        }


@p3_riot.route("/matchIds/<puuid>/<start>/<count>", methods=["GET"])
def get_match_ids(puuid, start, count):
    matchs = "lol/match/v5/matches/by-puuid/"
    header = {"X-Riot-Token": RIOTKEY}
    # 최근 전적 id 찾기
    try:
        match_list = requests.get(
            url_asia + matchs + puuid + "/ids" + "?start=" + start + "&count=" + count,
            headers=header,
        ).json()
        return {"status": "success", "matchList": match_list}
    except KeyError:
        return {
            "status": "error",
        }
    except TypeError:
        return {
            "status": "error",
        }


@p3_riot.route("/tier/<userid>", methods=["GET"])
def get_user_tier(userid):
    find_tier = "lol/league/v4/entries/by-summoner/"
    header = {"X-Riot-Token": RIOTKEY}
    # 유저 티어 찾기
    try:
        tier_list = requests.get(url_kr + find_tier + userid, headers=header).json()
        return {"status": "success", "tierList": tier_list}
    except KeyError:
        return {
            "status": "error",
        }
    except TypeError:
        return {
            "status": "error",
        }


@p3_riot.route("/match/<match_id>", methods=["GET"])
def get_match_info(match_id):
    header = {"X-Riot-Token": RIOTKEY}
    match_info = "lol/match/v5/matches/"

    # 최근 전적 정보 찾기
    try:
        ret = requests.get(url_asia + match_info + match_id, headers=header).json()
        participants = ret["info"]["participants"]
        ret_participants = []
        for participant in participants:
            ret_participants.append(
                {
                    "championName": participant["championName"],
                    "kill": participant["kills"],
                    "death": participant["deaths"],
                    "assist": participant["assists"],
                    "win": 1 if participant["win"] else 0,
                    "name": participant["summonerName"],
                    "deal": participant["totalDamageDealtToChampions"],
                }
            )
        return {"status": "success", "participants": ret_participants}
    except KeyError:
        return {
            "status": "error",
        }
    except TypeError:
        return {
            "status": "error",
        }

    # 모스트 찾기

@p3_riot.route("/most/<puuid>", methods=["GET"])
def get_most(puuid):
    header = {"X-Riot-Token": RIOTKEY}
    champ_top = "lol/champion-mastery/v4/champion-masteries/by-puuid/"
    mosts = []
    try:
        ret = requests.get(
            url_kr + champ_top + puuid + "/top?count=5", headers=header
        ).json()
        print(ret)
        for re in ret:
            mosts.append({"champ": re["championId"], "point": re["championPoints"]})
        return {"status": "success", "mosts": mosts}
    except KeyError:
        return {
            "status": "error",
        }
    except TypeError:
        return {
            "status": "error",
        }

