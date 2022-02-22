import {loadSync} from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';

const PROTO_PATH = "./proto_module/proto/user_data.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = loadSync(PROTO_PATH, options);

const NewsService = grpc.loadPackageDefinition(packageDefinition).userdata.api.UserDataService;

const client = new NewsService(
    "localhost:3009",
    grpc.credentials.createInsecure()
);

client.SetUserData({
    'user_id': '2',
    'pc_id': '123',
    'ip': 'any IP',
    'expires': new Date(),
    'user_agent': 'user_agent',
    'random_field': '654',
}, (error, data) => {
    if (error) throw error
    console.log({error, data});
});

client.GetByUserId({'user_id': '1'}, (error, data) => {
    if (error) throw error
    console.log(data);
});