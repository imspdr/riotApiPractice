import { css } from "@emotion/react";
import { useState } from "react";
import { useLolMainStore } from "../store/LolMainStoreProvider";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CloseIcon from "@mui/icons-material/Close";
import CommonTextField from "@src/common/CommonTextField";
import { unselectable } from "@src/common/util";

export default function LolHiddenButton() {
  const lolStore = useLolMainStore();

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [key, setKey] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div
      css={css`
        position: absolute;
        top: 100px;
        right: 100px;
        z-index: 10;
        ${open && "border: 1px solid; padding: 10px;"}
      `}
    >
      {open ? (
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          <div
            css={css`
              margin-right: 50px;
            `}
          >
            <CommonTextField
              value={key}
              width={200}
              height={30}
              onChange={(v) => {
                setKey(v);
              }}
              customCss="margin-bottom:10px;"
            />
            <CommonTextField
              width={200}
              height={30}
              value={password}
              onChange={(v) => {
                setPassword(v);
              }}
              customCss="margin-bottom:10px;"
            />
            <div
              onClick={async () => {
                const ret = await lolStore.updateToken(key, password);
                setStatus(
                  ret === "success" ? "성공" : "실패했습니다... 모르면 건드리지말아주세요..."
                );
                setTimeout(() => {
                  setStatus("");
                }, 3000);
              }}
              css={css`
                border-radius: 5px;
                width: 100px;
                border: 1px solid;
                padding: 0px 5px;
                ${unselectable}
              `}
            >
              {"토큰 등록하기"}
            </div>
            <div
              css={css`
                margin-top: 10px;
              `}
            >
              {status}
            </div>
          </div>
          <CloseIcon onClick={() => setOpen(false)} />
        </div>
      ) : (
        <AdminPanelSettingsIcon onClick={() => setOpen(true)} />
      )}
    </div>
  );
}
