// 我们来给 sass 增添类型声明文件，使用的时候有代码提示
export interface ScssVariables {
  menuText: string;
  menuActiveText: string;
  subMenuActiveText: string;
  menuBg: string;
  menuHover: string;
  subMenuBg: string;
  subMenuHover: string;
  sideBarWidth: string;
}
export const variables: ScssVariables;
export default variables;