import Image from "next/image";
import type { CSSProperties } from "react";

type GlowEffectProps = {
  left?: string;
  top?: string;
  right?: string;
  bottom?: string;
  src: string;
  width: number;
  height: number;
  alt?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

/**
 * 2025-11-07 21:30: 光影效果组件 —— 统一管理背景光影的定位与尺寸，方便可视化区块复用。
 */
export default function GlowEffect({
  left,
  top,
  right,
  bottom,
  src,
  width,
  height,
  alt = "",
  priority = false,
  className,
  imageClassName,
}: GlowEffectProps) {
  const containerClassName = ["pointer-events-none absolute", className].filter(Boolean).join(" ");
  const positionStyle: CSSProperties = { left, top, right, bottom };

  return (
    <div className={containerClassName} style={positionStyle}>
      {/* 2025-11-07 21:30: 将光影素材独立到 Next Image，便于自动优化与延迟加载 */}
      <Image src={src} alt={alt} width={width} height={height} priority={priority} className={imageClassName} />
    </div>
  );
}
