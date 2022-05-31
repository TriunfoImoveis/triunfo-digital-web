// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryLight?: string;
      primaryDark?: string;
      primaryAlpha?: string;

      orange?: string;
      orangeAlpha?: string;

      secondary: string;
      secondaryLight?: string;
      secondaryDark?: string;

      success: string;
      successLight?: string;
      successDark?: string;
      successAlpha: string;

      dangerLight?: string;
      danger: string;
      dangerDark?: string;
      borderColor?: string;

      warning?: string;
      warningAlpha: string;

      gray?: string;
      grayAlpha?: string;

      background: string;
      textColor?: string;
      textColorAlpha?: string;

      buttonAddColor?: string;
      buttonAddColorAlpha?: string;

      gold?: string;
    };
    fontSize: {
      tiny?: string;
      small?: string;
      dafault: string;
      large?: string;
    };
    borderRadius?: string;
    boxShadow?: string;
  }
}
