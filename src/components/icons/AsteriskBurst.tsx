import type { SVGProps } from "react";

export interface AsteriskBurstProps extends SVGProps<SVGSVGElement> {
  "aria-hidden"?: boolean;
}

/**
 * AsteriskBurst 星芒图标
 * 创建时间：2025-11-11 17:30
 * 说明：在 404 页面中渲染 12 条放射状光束，并允许通过 className/size/aria 属性复用。
 */
export function AsteriskBurst({
  className,
  "aria-hidden": ariaHidden = true,
  ...rest
}: AsteriskBurstProps) {
  // 2025-11-11 17:30: 12 条矩形辐射臂围绕 (12,12) 旋转，每 30° 递增一次。
  const rays = Array.from({ length: 12 }, (_, index) => (
    <rect
      key={index}
      x={11.25}
      y={1.5}
      width={1.5}
      height={9}
      rx={0.75}
      transform={`rotate(${index * 30} 12 12)`}
    />
  ));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden={ariaHidden}
      {...rest}
    >
      {rays}
      <circle cx={12} cy={12} r={2} />
    </svg>
  );
}

export default AsteriskBurst;
