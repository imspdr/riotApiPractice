import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { lolUser, most, tierInfo } from "../../store/types";
import { unselectable } from "@src/common/util";

function TierCard(props: { tier: tierInfo; width: number }) {
  const tier = props.tier;
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        transition: 0s;
        width: ${props.width}px;
        height: 30px;
        border-radius: 10px;
        margin-bottom: 5px;
        padding: 10px;
      `}
    >
      <span>
        {tier.queueType === "RANKED_FLEX_SR"
          ? "자유"
          : tier.queueType === "RANKED_SOLO_5x5"
          ? "솔로"
          : "기타"}{" "}
      </span>
      <span>{tier.tier + " " + tier.rank + " " + tier.leaguePoints + "p"}</span>
      <span>{`${tier.wins} 승 ${tier.losses} 패`}</span>
    </div>
  );
}

function MostCard(props: { most: most; width: number }) {
  const most = props.most;
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        transition: 0s;
        width: ${props.width}px;
        height: 30px;
        border-radius: 10px;
        margin-bottom: 5px;
        padding: 10px;
      `}
    >
      <span>{most.champ}</span>
      <span>{most.point}</span>
    </div>
  );
}

function ProfileCard(props: { user: lolUser | undefined; width: number }) {
  return (
    <>
      {props.user && (
        <div
          css={css`
            padding: 20px;
            border: 2px solid;
            border-radius: 20px;
            width: ${props.width - 40}px;
            ${props.width < 400 && "font-size: 12px;"}
            ${unselectable}
          `}
        >
          <div
            css={css`
              font-size: 20px;
              margin-bottom: 10px;
            `}
          >
            {props.user.name}
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            {props.user.tierList.map((tier: tierInfo) => (
              <TierCard tier={tier} width={props.width - 50} />
            ))}
            {props.user.mosts.map((mo: most) => (
              <MostCard most={mo} width={props.width - 50} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default observer(ProfileCard);
