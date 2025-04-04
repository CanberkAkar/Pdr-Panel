import * as fs from 'fs';

export default () => {
    const readSecret = (secretName: string, defaultValue: string) => {
        const secretPath = `/run/secrets/${secretName}`;
        return fs.existsSync(secretPath) ? fs.readFileSync(secretPath, 'utf8').trim() : defaultValue;
    };

    return {
        database: {
            type: 'mysql',
            host: readSecret('db_host', process.env.DB_HOST || 'localhost'),
            port: parseInt(readSecret('db_port', process.env.DB_PORT || '3306')),
            username: readSecret('db_username', process.env.DB_USERNAME || 'root'),
            password: readSecret('db_password', process.env.DB_PASSWORD || ''),
            database: readSecret('db_database', process.env.DB_DATABASE || 'mydb'),
            synchronize: true,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Tüm entity'leri alır
        },
    };
};
