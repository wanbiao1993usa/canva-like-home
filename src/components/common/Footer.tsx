// 2025-10-29: 页脚（Figma node 345:4993）
// 说明：左侧品牌与版权信息，右侧链接导航与社交图标；图标使用占位命名

export default function Footer() {
  return (
    <footer className="py-20 text-[14px] text-white/80">
      <div className="flex w-full items-center justify-between px-2 xl:px-0">
        {/* 左侧：品牌与版权 */}
        <div className="flex items-center gap-3">
          {/* 占位品牌图标 */}
          <img src="/assets/icons/brand-logo.svg" alt="CanDe" className="h-8 w-8" />
          <div className="leading-[16px]">
            <div className="flex items-center gap-1">
              <span>CanDe ©</span>
              <span>{new Date().getFullYear()}</span>
            </div>
            <div>All rights reserved.</div>
          </div>
        </div>

        {/* 右侧：链接与社交 */}
        <nav className="flex items-center gap-8 text-white">
          <a href="#" className="opacity-90 hover:opacity-100">主页</a>
          <a href="#" className="opacity-90 hover:opacity-100">灵感</a>
          <a href="#" className="opacity-90 hover:opacity-100">价格</a>
          <a href="#" className="opacity-90 hover:opacity-100">关于</a>
          <a href="#" className="opacity-90 hover:opacity-100">帮助</a>
        </nav>
      </div>

      <div className="flex pt-4 items-center justify-end gap-4 text-white">
        {/* X 与 Discord 占位图标（16px 与 21×16） */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <g clipPath="url(#clip0_345_5068)">
            <path d="M9.522 6.775L15.479 0H14.067L8.895 5.883L4.764 0H0L6.247 8.895L0 16H1.412L6.873 9.788L11.236 16H16L9.522 6.775ZM7.589 8.974L6.956 8.088L1.92 1.04H4.088L8.152 6.728L8.785 7.614L14.068 15.008H11.9L7.589 8.974Z" fill="#ffffff" />
          </g>
          <defs>
            <clipPath id="clip0_345_5068">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16">
          <g clipPath="url(#clip0_345_5108)">
            <path d="M13.4559 -0.0649414C13.2509 0.303059 13.0649 0.681059 12.8989 1.06706C11.3049 0.827059 9.68488 0.827059 8.09088 1.06706C7.92688 0.680059 7.74088 0.302059 7.53388 -0.0649414C6.03788 0.192059 4.58088 0.643059 3.19988 1.27806C0.460883 5.35706 -0.280117 9.33106 0.0878832 13.2501C1.69288 14.4431 3.49088 15.3501 5.40188 15.9311C5.83288 15.3501 6.21388 14.7331 6.54188 14.0871C5.92188 13.8561 5.32288 13.5651 4.74888 13.2281C4.89988 13.1191 5.04688 13.0051 5.18888 12.8961C8.55388 14.4871 12.4489 14.4871 15.8139 12.8961C15.9559 13.0141 16.1029 13.1271 16.2539 13.2281C15.6809 13.5681 15.0799 13.8571 14.4569 14.0911C14.7839 14.7371 15.1649 15.3541 15.5959 15.9351C17.5069 15.3551 19.3049 14.4501 20.9109 13.2581C21.3459 8.71206 20.1649 4.77206 17.7909 1.28206C16.4119 0.646059 14.9559 0.196059 13.4599 -0.0569414L13.4559 -0.0649414ZM7.01088 10.8371C5.97688 10.8371 5.11788 9.89506 5.11788 8.72906C5.11788 7.56306 5.94288 6.61506 7.00688 6.61506C8.06988 6.61506 8.91588 7.56706 8.89988 8.72906C8.88288 9.89006 8.06588 10.8371 7.01088 10.8371ZM13.9879 10.8371C12.9499 10.8371 12.0989 9.89506 12.0989 8.72906C12.0989 7.56306 12.9239 6.61506 13.9879 6.61506C15.0519 6.61506 15.8939 7.56706 15.8769 8.72906C15.8599 9.89006 15.0439 10.8371 13.9879 10.8371Z" fill="#ffffff" />
          </g>
          <defs>
            <clipPath id="clip0_345_5108">
              <rect width="21" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </footer>
  );
}


