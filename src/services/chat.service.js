import api from '../api'
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'

export const chatService = {
    connection
}

const connection = new HubConnectionBuilder()
    .withUrl(`${api.url}/api/chat`)
    .configureLogging(LogLevel.Information)
    .build();
