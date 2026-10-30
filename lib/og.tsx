import { ImageResponse } from "next/og";
import { pipelineNodes } from "@/data/pipeline";
import { profile } from "@/data/profile";

export const OG_SIZE = { width: 1200, height: 630 };

/** Shared by the Open Graph and Twitter images. Inline styles only: the renderer has no CSS engine. */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0B0D",
          color: "#ECEEF1",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#22D3EE" }}>ankit / am</div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ display: "flex", marginTop: 8, fontSize: 40, color: "#949BA6" }}>
            Data Engineer, growing toward ML engineering
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, maxWidth: 900, lineHeight: 1.3 }}>
            {profile.headline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {pipelineNodes.map((node, index) => (
            <div key={node.id} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  border: "1px solid #2A2E36",
                  borderRadius: 8,
                  padding: "8px 14px",
                  fontSize: 20,
                  color: "#949BA6",
                }}
              >
                {node.label}
              </div>
              {index < pipelineNodes.length - 1 ? (
                <div style={{ display: "flex", width: 20, height: 1, background: "#22D3EE" }} />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
