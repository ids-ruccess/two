import { ConfigService } from '@nestjs/config';
import * as process from 'process';
import {ENV} from "../dtos/env.dto";
import {GetSecretValueCommand, SecretsManagerClient} from "@aws-sdk/client-secrets-manager";
import {ServerException} from "COMMON/filter/exception/server.exception";
import ErrorMessage from "COMMON/constants/errorMessage";

/**
 * 사용방법
 *
 */
export default async (): Promise<ENV> => {
    const configService = new ConfigService();

    // console.log('-----------------------------------------------');
    // console.log(`AWS_ACCESS_KEY: ${process.env.AWS_ACCESS_KEY}`);
    // console.log(`AWS_SECRET_KEY: ${process.env.AWS_SECRET_KEY}`);
    // console.log(`AWS_ACCESS_KEY_ID: ${process.env.AWS_ACCESS_KEY_ID}`);
    // console.log(`AWS_SECRET_ACCESS_KEY: ${process.env.AWS_SECRET_ACCESS_KEY}`);
    // console.log(`AWS_SECRET_Name: ${process.env.AWS_SECRET_NAME}`);
    // console.log('-----------------------------------------------');
    let secrets;
    if (process.env.MODE !== 'local') {
        const secretName = process.env.AWS_SECRET_NAME!;
        secrets = await fetchSecrets(secretName);
    }


    return setEnv(secrets, configService);
};

const setEnv = (secrets: any, configService: ConfigService) => {
    return {
        MODE: secrets?.MODE || configService.get('MODE'),
        PORT: +secrets?.PORT || +configService.get('PORT'),
        DATABASE: {
        HOST: secrets?.DB_HOST || configService.get('DB_HOST'),
            PORT: +secrets?.DB_PORT || +configService.get('DB_PORT'),
            USERNAME: secrets?.DB_USERNAME || configService.get('DB_USERNAME'),
            PASSWORD: secrets?.DB_PASSWORD || configService.get('DB_PASSWORD'),
            DB: secrets?.DB_DATABASE || configService.get('DB_DATABASE'),
        },
        AWS: {
            AWS_REGION: secrets?.AWS_REGION || configService.get('AWS_REGION'),
                AWS_ACCESS_KEY_ID: secrets?.AWS_ACCESS_KEY_ID || configService.get('AWS_ACCESS_KEY_ID'),
                AWS_SECRET_ACCESS_KEY: secrets?.AWS_SECRET_ACCESS_KEY || configService.get('AWS_SECRET_ACCESS_KEY'),
                AWS_SECRET_NAME: secrets?.AWS_SECRET_NAME || configService.get('AWS_SECRET_NAME'),
        },
        JWT: {
            SECRET: secrets?.JWT_SECRET || configService.get('JWT_SECRET'),
        },
        API_KEY: {
            DIET_API_KEY: secrets?.DIET_API_KEY || configService.get('DIET_API_KEY'),
                WELLCHECK_API_KEY: secrets?.WELLCHECK_API_KEY || configService.get('JWT_SECRET'),
                GUNGISIK_API_KEY: secrets?.GUNGISIK_API_KEY || configService.get('GUNGISIK_API_KEY'),
        },
        CODE: {
            APP_HASH: secrets?.APP_HASH || configService.get('APP_HASH'),
        },
        SMS: {
            SMS_SENDER: secrets?.SMS_SENDER || configService.get('SMS_SENDER'),
                SMS_BASE_URL: secrets?.SMS_BASE_URL || configService.get('SMS_BASE_URL'),
                SMS_ABROAD_SENDER: secrets?.SMS_ABROAD_SENDER || configService.get('SMS_ABROAD_SENDER'),
                SMS_AUTHORIZATION: secrets?.SMS_AUTHORIZATION || configService.get('SMS_AUTHORIZATION'),
        },
        NAVER: {
            NAVER_TOKEN_BASE_URL: secrets?.NAVER_TOKEN_BASE_URL || configService.get('NAVER_TOKEN_BASE_URL'),
                NAVER_CLIENT_ID: secrets?.NAVER_CLIENT_ID || configService.get('NAVER_CLIENT_ID'),
                NAVER_CLIENT_SECRET: secrets?.NAVER_CLIENT_SECRET || configService.get('NAVER_CLIENT_SECRET'),
                NAVER_REDIRECT_URI: secrets?.NAVER_REDIRECT_URI || configService.get('NAVER_REDIRECT_URI'),
                NAVER_DATA_BASE_URL: secrets?.NAVER_DATA_BASE_URL || configService.get('NAVER_DATA_BASE_URL'),
        },
        KAKAO: {
            KAKAO_TOKEN_BASE_URL: secrets?.KAKAO_TOKEN_BASE_URL || configService.get('KAKAO_TOKEN_BASE_URL'),
                KAKAO_CLIENT_ID: secrets?.KAKAO_CLIENT_ID || configService.get('KAKAO_CLIENT_ID'),
                KAKAO_CLIENT_SECRET: secrets?.KAKAO_CLIENT_SECRET || configService.get('KAKAO_CLIENT_SECRET'),
                KAKAO_REDIRECT_URI: secrets?.KAKAO_REDIRECT_URI || configService.get('KAKAO_REDIRECT_URI'),
                KAKAO_DATA_BASE_URL: secrets?.KAKAO_DATA_BASE_URL || configService.get('KAKAO_DATA_BASE_URL'),
        },
        APPLE: {
            APPLE_TOKEN_BASE_URL: secrets?.APPLE_TOKEN_BASE_URL || configService.get('APPLE_TOKEN_BASE_URL'),
                APPLE_CLIENT_ID: secrets?.APPLE_CLIENT_ID || configService.get('APPLE_CLIENT_ID'),
                APPLE_KEY_ID: secrets?.APPLE_KEY_ID || configService.get('APPLE_KEY_ID'),
                APPLE_TEAM_ID: secrets?.APPLE_TEAM_ID || configService.get('APPLE_TEAM_ID'),
                APPLE_PRIVATE_KEY: secrets?.APPLE_PRIVATE_KEY || configService.get('APPLE_PRIVATE_KEY'),
                APPLE_AUDIENCE_URL: secrets?.APPLE_AUDIENCE_URL || configService.get('APPLE_AUDIENCE_URL'),
        },
        CRYPTO: {
            AUTH_ENCODE_KEY: secrets?.AUTH_ENCODE_KEY || configService.get('AUTH_ENCODE_KEY'),
                AUTH_ENCODE_IV: secrets?.AUTH_ENCODE_IV || configService.get('AUTH_ENCODE_IV'),
        },
        WEB_VIEW: {
            WEB_VIEW_URL: secrets?.WEB_VIEW_URL || configService.get('WEB_VIEW_URL'),
        },
    }
}

const fetchSecrets = async (secretName: string) => {
    const client = new SecretsManagerClient({
        region: process.env.AWS_REGION,
    });
    try {
        const response = await client.send(
            new GetSecretValueCommand({
                SecretId: secretName,
            }),
        );

        if(response.SecretString) return JSON.parse(response.SecretString);
        else throw new ServerException(ErrorMessage.COMMON.NOT_CONNECTION_SECRET_MANAGER)

    } catch (error) {
        throw error;
    }
};
