export interface ENV {
    MODE: 'local'| 'dev' | 'qa' | 'prod';
    PORT: number;
    DATABASE: DataBaseENV;
    AWS: AWSENV;
    JWT: JWTENV;
    API_KEY: APIKEYENV;
    CODE: CodeENV;
    SMS: SmsENV;
    NAVER: NaverENV;
    KAKAO: KakaoENV;
    APPLE: AppleENV;
    CRYPTO: CryptoEnv;
    WEB_VIEW: WebViewEnv;
}

export interface WebViewEnv {
    WEB_VIEW_URL: string;
}

export interface CodeENV {
    APP_HASH: string;
}

export interface CryptoEnv {
    AUTH_ENCODE_KEY: string;
    AUTH_ENCODE_IV: string;
}

export interface NaverENV {
    NAVER_TOKEN_BASE_URL: string;
    NAVER_CLIENT_ID: string;
    NAVER_CLIENT_SECRET: string;
    NAVER_REDIRECT_URI: string;
    NAVER_DATA_BASE_URL: string;
}

export interface KakaoENV {
    KAKAO_TOKEN_BASE_URL: string;
    KAKAO_CLIENT_ID: string;
    KAKAO_CLIENT_SECRET: string;
    KAKAO_REDIRECT_URI: string;
    KAKAO_DATA_BASE_URL: string;
}

export interface AppleENV {
    APPLE_TOKEN_BASE_URL: string;
    APPLE_CLIENT_ID: string;
    APPLE_KEY_ID: string;
    APPLE_TEAM_ID: string;
    APPLE_PRIVATE_KEY: string;
    APPLE_AUDIENCE_URL: string;
}

export interface SmsENV {
    SMS_BASE_URL: string;
    SMS_SENDER: string;
    SMS_ABROAD_SENDER: string;
    SMS_AUTHORIZATION: string;
}

export interface DataBaseENV {
    HOST: string;
    PORT: number;
    USERNAME: string;
    PASSWORD: string;
    DB: string;
}

export interface AWSENV {
    AWS_REGION: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_SECRET_NAME: string;
}

export interface JWTENV {
    SECRET: string;
}

export interface APIKEYENV {
    DIET_API_KEY: string;
    WELLCHECK_API_KEY: string;
    GUNGISIK_API_KEY: string;
}
