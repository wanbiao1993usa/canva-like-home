// 2025-10-29: 呼叫设计大师，同屏共创（Figma node 345:4797）
// 说明：左侧为信息图区域（呼叫设计师卡片 + 大图卡片 + 光晕与指针标签），右侧为标题与两条说明卡。
// 图标与图片均为占位命名，后续请在 public/assets 下按路径补齐资源（UTF-8）。
import type { CSSProperties } from "react";
import GlowEffect from "./GlowEffect";
import { gradentTextXs } from "../ui";

export default function CallDesignerCollab() {
  return (
    <section className="py-12">
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center gap-12">
        {/* 光影效果 */}
        <GlowEffect
          top="-10rem"
          left="-18rem"
          src="/assets/icons/template-eclipse.svg"
          width={900}
          height={900}
          alt="生成演示光影"
          priority={false}
          className="flex w-full justify-center"
        />

        {/* 左侧：信息图（参考 712×575） */}
        <div className="relative h-[575px] w-[712px] rounded-[32px]">
          {/* 顶部小卡片：呼叫设计师... 450×154 */}
          <div className="absolute left-0 top-0 w-[450px] rounded-[24px] border border-white/10 bg-[#111111] p-8">
            {/* 2025-10-29: CSS 实现的 Loading 圆环（外圈轨道 + 旋转高亮扇形） */}
            <div className="relative mx-auto mb-4 h-12 w-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M44.4 24C46.3882 24 48.0276 22.3793 47.7305 20.4134C47.2057 16.9409 45.9226 13.6107 43.9553 10.6663C41.3181 6.71953 37.5698 3.64339 33.1844 1.82689C28.799 0.010388 23.9734 -0.464892 19.3178 0.461153C14.6623 1.3872 10.3859 3.67298 7.02944 7.02944C3.67298 10.3859 1.3872 14.6623 0.461153 19.3178C-0.464892 23.9734 0.0103881 28.799 1.82689 33.1844C3.64339 37.5698 6.71953 41.3181 10.6663 43.9553C13.6107 45.9226 16.9409 47.2057 20.4134 47.7305C22.3793 48.0276 24 46.3882 24 44.4C24 42.4118 22.3702 40.8386 20.4274 40.4158C18.381 39.9704 16.4254 39.144 14.6664 37.9687C11.9037 36.1227 9.75038 33.4989 8.47882 30.4291C7.20727 27.3593 6.87458 23.9814 7.52281 20.7225C8.17104 17.4636 9.77108 14.4701 12.1206 12.1206C14.4701 9.77108 17.4636 8.17104 20.7225 7.52281C23.9814 6.87458 27.3593 7.20727 30.4291 8.47882C33.4989 9.75038 36.1227 11.9037 37.9687 14.6664C39.144 16.4254 39.9704 18.381 40.4158 20.4274C40.8386 22.3702 42.4118 24 44.4 24Z" fill="url(#paint0_linear_345_4801)" />
                <defs>
                  <linearGradient id="paint0_linear_345_4801" x1="27.84" y1="5.04" x2="12.48" y2="43.68" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0797614" stopColor="white" stopOpacity="0.2" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex items-center justify-center gap-2">
              {/* 占位图标：/assets/icons/call-frame.svg */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19.943 7.13859C19.1133 6.91594 18.2625 7.40812 18.0398 8.23781L18.7875 5.45109C19.0102 4.62141 18.518 3.77062 17.6883 3.54797C16.8586 3.32531 16.0078 3.8175 15.7852 4.64719L16.0008 3.84094C16.2234 3.01125 15.7313 2.16047 14.9016 1.93781C14.0719 1.71516 13.2211 2.20734 12.9984 3.03703L12.5227 4.81359C12.7453 3.98625 12.2531 3.13312 11.4234 2.91047C10.5961 2.68781 9.74297 3.18 9.52266 4.00969L7.78828 10.4784L7.22578 12.5808L5.76563 10.0519C5.33672 9.30891 4.3875 9.05344 3.64453 9.48234C2.90156 9.91125 2.82422 10.7292 3.075 11.6034C3.34688 12.5456 4.275 16.2956 5.81485 18.5784C7.35469 20.8612 9.60703 21.5995 9.60703 21.5995C13.3383 22.9027 17.1023 21.8386 18.6211 17.2425C20.1023 12.7566 21.0375 9.04172 21.0375 9.04172C21.2648 8.21437 20.7727 7.36125 19.943 7.13859Z" fill="#AE89FF" />
                <path d="M20.0491 6.66553C19.8756 6.61865 19.6975 6.59521 19.5194 6.59521C19.3225 6.59521 19.1303 6.62334 18.9475 6.67725L19.2405 5.58037C19.5311 4.49053 18.8842 3.36787 17.7944 3.0749C17.621 3.02803 17.4428 3.00459 17.2647 3.00459C16.9999 3.00459 16.7444 3.05615 16.5077 3.1499C16.4702 2.89443 16.3858 2.646 16.2522 2.41631C15.978 1.94287 15.5374 1.60537 15.01 1.4624C14.8366 1.41553 14.6585 1.39209 14.4803 1.39209C13.5569 1.39209 12.746 2.01553 12.5069 2.9085L12.4835 2.99521C12.2327 2.73271 11.9116 2.5335 11.5342 2.43271C11.3608 2.38584 11.1827 2.3624 11.0045 2.3624C10.0811 2.3624 9.27017 2.98584 9.03111 3.87881L7.04127 11.3015L6.17642 9.80147C5.81314 9.171 5.13345 8.77959 4.40455 8.77959C4.0483 8.77959 3.69439 8.87334 3.38267 9.05381C2.91392 9.32334 2.60689 9.74522 2.4897 10.2679C2.39595 10.6944 2.42877 11.189 2.5858 11.7374C2.61392 11.8312 2.64673 11.9577 2.68892 12.1054C3.07095 13.4905 3.96392 16.7366 5.39127 18.8507C6.98502 21.2132 9.27486 22.0101 9.43189 22.0616C10.4631 22.4226 11.4803 22.603 12.4553 22.603C13.9553 22.603 15.2819 22.1812 16.4022 21.3468C17.6022 20.4515 18.5022 19.1226 19.0717 17.3929C20.5225 13.0007 21.4624 9.29521 21.4975 9.16162C21.7858 8.07881 21.1366 6.95615 20.0491 6.66553ZM20.5436 8.91553C20.5436 8.91787 20.5413 8.92022 20.5413 8.92256C20.5319 8.96006 19.5944 12.6702 18.1342 17.0882C17.628 18.621 16.8475 19.7905 15.8116 20.5616C14.867 21.2647 13.7374 21.6233 12.453 21.6233C11.5881 21.6233 10.6788 21.4593 9.75064 21.1335C9.7483 21.1335 9.74595 21.1312 9.74361 21.1312C9.73892 21.1288 9.20455 20.9507 8.50377 20.5101C7.34361 19.7812 6.6147 18.9069 6.20455 18.3022C4.86627 16.3194 4.00377 13.1835 3.6358 11.8452C3.59361 11.6952 3.55845 11.5663 3.53033 11.4655C3.4483 11.1772 3.19517 10.2983 3.87252 9.90693C4.03423 9.81318 4.21705 9.76397 4.4022 9.76397C4.78189 9.76397 5.13345 9.96787 5.3233 10.2937L6.78345 12.8226C6.88189 12.996 7.07642 13.0897 7.2733 13.064C7.47017 13.0382 7.63189 12.8952 7.68345 12.703L9.98033 4.13428C10.1045 3.67021 10.5264 3.34678 11.0045 3.34678C11.096 3.34678 11.1897 3.3585 11.2788 3.38428C11.8436 3.53662 12.1788 4.11787 12.0288 4.68271L10.3835 10.821C10.3131 11.0835 10.4678 11.353 10.7303 11.4233C10.7725 11.4351 10.8147 11.4397 10.8569 11.4397C11.0749 11.4397 11.2741 11.2944 11.3327 11.0741L12.9756 4.94053V4.93818V4.93584L13.4514 3.16162C13.5756 2.69756 13.9975 2.37412 14.4756 2.37412C14.567 2.37412 14.6608 2.38584 14.7522 2.41162C15.0264 2.48428 15.2538 2.66006 15.3967 2.90615C15.5374 3.15225 15.5772 3.43818 15.5022 3.7124L15.317 4.40381L13.3835 11.6226C13.3131 11.8851 13.4678 12.1546 13.7303 12.2249C13.7725 12.2366 13.8147 12.2413 13.8569 12.2413C14.0749 12.2413 14.2741 12.096 14.3327 11.8757L16.2358 4.77178V4.76709C16.36 4.30537 16.7819 3.98193 17.26 3.98193C17.3514 3.98193 17.4452 3.99365 17.5366 4.01943C18.1014 4.17178 18.4389 4.75303 18.2866 5.31787L17.5436 8.10928V8.11397L16.2803 12.8296C16.21 13.0921 16.3647 13.3616 16.6272 13.4319C16.6694 13.4437 16.7116 13.4483 16.7538 13.4483C16.9717 13.4483 17.171 13.303 17.2295 13.0827L18.4952 8.3624C18.6194 7.90068 19.0413 7.57959 19.517 7.57959C19.6085 7.57959 19.7022 7.59131 19.7936 7.61709C20.3585 7.76709 20.696 8.35068 20.5436 8.91553Z" fill="#111111" />
                <path d="M6.11071 7.97379C6.15289 7.98551 6.19743 7.9902 6.23727 7.9902C6.45524 7.9902 6.65446 7.84489 6.71305 7.62457L7.87555 3.28629C7.94586 3.02379 7.79118 2.75426 7.52868 2.68395C7.26618 2.61364 6.99664 2.76832 6.92633 3.03082L5.76383 7.3691C5.69352 7.63395 5.84821 7.90348 6.11071 7.97379ZM3.43414 8.54567C3.47633 8.55739 3.51852 8.56207 3.56071 8.56207C3.77867 8.56207 3.97789 8.41676 4.03649 8.19645L5.08649 4.28004C5.1568 4.01754 5.00211 3.74801 4.73961 3.6777C4.47711 3.60739 4.20758 3.76207 4.13727 4.02457L3.08727 7.94098C3.01696 8.20348 3.17164 8.47535 3.43414 8.54567Z" fill="#AE89FF" />
              </svg>
              <span className="text-[18px] text-white/70">呼叫设计师...</span>
            </div>
          </div>

          {/* 大图卡片：设计师说： 576×409 @ (40,166) */}
          <div className="absolute left-[40px] top-[165.97px] h-[409px] w-[576px] rounded-[24px] border border-white/10 bg-[#111111] p-8">
            <div className="text-[18px] text-white/90">设计师说：</div>
            {/* 内容图 512×296 */}
            <div className="mt-6 h-[296px] w-[512px] overflow-hidden rounded-[16px]">
              {/* 占位图片：/assets/images/call-designer-sample.png */}
              <img src="/assets/images/call-designer-sample.png" alt="designer-say" className="h-full w-full object-cover" />
            </div>

            {/* 漂浮标签与指针（位置近似还原） */}
            <div className="absolute left-[-30px] top-[104px]">
              <div className="inline-flex bg-[#181818] rotate-[354deg] items-center gap-2 rounded-[8px] border border-[#2bb6ff] px-[14px] py-[4px] text-[16px] text-[#2bb6ff]">Nina</div>

              <div className="absolute right-[-35px] top-[20px]">
                {/* 占位指针：/assets/icons/cursor-02.svg */}
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                  <g filter="url(#filter0_d_345_4849)">
                    <path d="M16.1445 20.289L9.89717 18.5717C6.2939 17.5811 4.49226 17.0859 4.43675 16.0058C4.38123 14.9256 6.13542 14.2433 9.64379 12.8786C10.6883 12.4722 11.2107 12.269 11.5443 11.8571C11.878 11.4451 11.9681 10.8919 12.1484 9.78561C12.7538 6.07027 13.0565 4.21255 14.1246 4.04228C15.1927 3.872 16.0517 5.53129 17.7697 8.84989L20.7485 14.6036C22.5472 18.078 23.4465 19.8152 22.6249 20.8299C21.8032 21.8446 19.917 21.326 16.1445 20.289Z" fill="#2BB6FF" />
                    <path d="M16.1445 20.289L9.89717 18.5717C6.2939 17.5811 4.49226 17.0859 4.43675 16.0058C4.38123 14.9256 6.13542 14.2433 9.64379 12.8786C10.6883 12.4722 11.2107 12.269 11.5443 11.8571C11.878 11.4451 11.9681 10.8919 12.1484 9.78561C12.7538 6.07027 13.0565 4.21255 14.1246 4.04228C15.1927 3.872 16.0517 5.53129 17.7697 8.84989L20.7485 14.6036C22.5472 18.078 23.4465 19.8152 22.6249 20.8299C21.8032 21.8446 19.917 21.326 16.1445 20.289Z" stroke="white" strokeWidth="0.7" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <filter id="filter0_d_345_4849" x="2.08546" y="2.68018" width="23.1958" height="22.0479" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="1" />
                      <feGaussianBlur stdDeviation="1" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_345_4849" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_345_4849" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>


            {/* 2025-11-07: Paul 标签 + 指针（右上角，暖橙色） */}
            <div className="absolute right-[-20px] top-[104px]">
              <div className="inline-flex bg-[#181818] rotate-[6deg] items-center gap-2 rounded-[10px] border border-[#FFB21E] px-[14px] py-[4px] text-[16px] text-[#FFB21E]">
                Paul
              </div>
              <div className="absolute right-[75px] top-[30px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                  <g filter="url(#filter0_d_345_4869)">
                    <path d="M10.2327 20.289L16.48 18.5717C20.0833 17.5811 21.8849 17.0859 21.9405 16.0058C21.996 14.9256 20.2418 14.2433 16.7334 12.8786C15.6889 12.4722 15.1665 12.269 14.8329 11.8571C14.4992 11.4451 14.4091 10.8919 14.2288 9.78561C13.6234 6.07027 13.3207 4.21255 12.2526 4.04228C11.1845 3.872 10.3255 5.53129 8.60746 8.84989L5.62876 14.6036C3.83005 18.078 2.93069 19.8152 3.75234 20.8299C4.574 21.8446 6.46025 21.326 10.2327 20.289Z" fill="#FBA809" />
                    <path d="M10.2327 20.289L16.48 18.5717C20.0833 17.5811 21.8849 17.0859 21.9405 16.0058C21.996 14.9256 20.2418 14.2433 16.7334 12.8786C15.6889 12.4722 15.1665 12.269 14.8329 11.8571C14.4992 11.4451 14.4091 10.8919 14.2288 9.78561C13.6234 6.07027 13.3207 4.21255 12.2526 4.04228C11.1845 3.872 10.3255 5.53129 8.60746 8.84989L5.62876 14.6036C3.83005 18.078 2.93069 19.8152 3.75234 20.8299C4.574 21.8446 6.46025 21.326 10.2327 20.289Z" stroke="white" strokeWidth="0.6" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <filter id="filter0_d_345_4869" x="1.14587" y="2.73047" width="23.0959" height="21.9478" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="1" />
                      <feGaussianBlur stdDeviation="1" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_345_4869" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_345_4869" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>


            {/* 2025-11-07: Francisco 标签 + 指针（左下角，紫色） */}
            <div className="absolute left-[-30px] bottom-[70px]">
              <div className="inline-flex bg-[#181818] rotate-[6deg] items-center gap-2 rounded-[12px] border border-[#8E79FF] px-[14px] py-[4px] text-[16px] text-[#8E79FF]">
                Francisco
              </div>
              <div className="absolute left-[100px] top-[-15px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                  <g filter="url(#filter0_d_345_4861)">
                    <path d="M16.1445 6.08843L9.89717 7.80578C6.2939 8.7963 4.49226 9.29155 4.43675 10.3717C4.38123 11.4519 6.13542 12.1342 9.64379 13.4989C10.6883 13.9052 11.2107 14.1084 11.5443 14.5203C11.878 14.9324 11.9681 15.4855 12.1484 16.5918C12.7538 20.3072 13.0565 22.1649 14.1246 22.3352C15.1927 22.5054 16.0517 20.8461 17.7697 17.5276L20.7485 11.7739C22.5472 8.29941 23.4465 6.56221 22.6249 5.54754C21.8032 4.53289 19.917 5.0514 16.1445 6.08843Z" fill="#8E79FF" />
                    <path d="M16.1445 6.08843L9.89717 7.80578C6.2939 8.7963 4.49226 9.29155 4.43675 10.3717C4.38123 11.4519 6.13542 12.1342 9.64379 13.4989C10.6883 13.9052 11.2107 14.1084 11.5443 14.5203C11.878 14.9324 11.9681 15.4855 12.1484 16.5918C12.7538 20.3072 13.0565 22.1649 14.1246 22.3352C15.1927 22.5054 16.0517 20.8461 17.7697 17.5276L20.7485 11.7739C22.5472 8.29941 23.4465 6.56221 22.6249 5.54754C21.8032 4.53289 19.917 5.0514 16.1445 6.08843Z" stroke="white" strokeWidth="0.8" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <filter id="filter0_d_345_4861" x="2.03541" y="3.59961" width="23.2959" height="22.1475" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="1" />
                      <feGaussianBlur stdDeviation="1" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_345_4861" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_345_4861" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>


            {/* 2025-11-07: Bogdan 标签 + 指针（右下角，红橙色） */}
            <div className="absolute right-[10px] bottom-[80px]">
              <div className="inline-flex bg-[#181818] rotate-[-6deg] items-center gap-2 rounded-[12px] border border-[#F3785D] px-[14px] py-[4px] text-[16px] text-[#F3785D]">
                Bogdan
              </div>
            </div>
            <div className="absolute right-[100px] bottom-[100px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                <g filter="url(#filter0_d_345_4878)">
                  <path d="M10.2327 6.08843L16.48 7.80578C20.0833 8.7963 21.8849 9.29155 21.9405 10.3717C21.996 11.4519 20.2418 12.1342 16.7334 13.4989C15.6889 13.9052 15.1665 14.1084 14.8329 14.5203C14.4992 14.9324 14.4091 15.4855 14.2288 16.5918C13.6234 20.3072 13.3207 22.1649 12.2526 22.3352C11.1845 22.5054 10.3255 20.8461 8.60746 17.5276L5.62876 11.7739C3.83005 8.29941 2.93069 6.56221 3.75234 5.54754C4.574 4.53289 6.46025 5.0514 10.2327 6.08843Z" fill="#F3785D" />
                  <path d="M10.2327 6.08843L16.48 7.80578C20.0833 8.7963 21.8849 9.29155 21.9405 10.3717C21.996 11.4519 20.2418 12.1342 16.7334 13.4989C15.6889 13.9052 15.1665 14.1084 14.8329 14.5203C14.4992 14.9324 14.4091 15.4855 14.2288 16.5918C13.6234 20.3072 13.3207 22.1649 12.2526 22.3352C11.1845 22.5054 10.3255 20.8461 8.60746 17.5276L5.62876 11.7739C3.83005 8.29941 2.93069 6.56221 3.75234 5.54754C4.574 4.53289 6.46025 5.0514 10.2327 6.08843Z" stroke="white" strokeWidth="0.8" strokeLinejoin="round" />
                </g>
                <defs>
                  <filter id="filter0_d_345_4878" x="1.0459" y="3.59961" width="23.2958" height="22.1475" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_345_4878" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_345_4878" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* 右侧：标题与说明内容（宽 520） */}
        <div className="flex w-[520px] flex-col gap-6">
          {/* 数字胶囊标题 */}
          <div className="inline-flex w-74 items-center gap-4 rounded-[100px] border border-white/15 bg-[#181818] px-2 py-2 pr-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-[40px] bg-[#AE89FF] text-[18px] text-[#191919]">4</span>
            <span className={`text-[18px] ${gradentTextXs}`}>呼叫设计大师，同屏共创</span>
          </div>

          <div className="border border-white/15 bg-[#181818] rounded-[24px]">
            {/* 说明卡 1：顶级设计师在线 */}
            <div className="p-6 pb-3">
              <div className="mb-3 flex items-center gap-3">
                {/* 占位图标：/assets/icons/call-sparkles.svg */}
                <img src="/assets/icons/call-sparkles.svg" alt="sparkles" className="h-6 w-6" />
                <span className="text-[18px] text-white">顶级设计师在线</span>
              </div>
              <p className="text-[16px] text-white/60">连接世界顶尖设计师，24小时在线待命。深夜灵感或紧急需求，专业创意即刻响应</p>
            </div>

            {/* 说明卡 2：实时协作编辑 */}
            <div className="p-6 pt-3">
              <div className="mb-3 flex items-center gap-3">
                {/* 占位图标：/assets/icons/call-robot.svg */}
                <img src="/assets/icons/call-robot.svg" alt="robot" className="h-6 w-6" />
                <span className="text-[18px] text-white">实时协作编辑</span>
              </div>
              <p className="text-[16px] text-white/60">实时加入画布，同步鼠标轨迹、即改即看。设计师像在你身边，共创每一个灵感时刻</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


