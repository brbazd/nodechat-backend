import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/chat'
})
export class ChatGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: { content: string, date: string }): void {
    this.server.emit('message',payload);
  }

  @SubscribeMessage('join')
  handleJoinRoom(client: Socket, room: string): void {
    client.join(room);
  }

  @SubscribeMessage('leave')
  handleLeaveRoom(client: Socket, room: string): void {
    client.leave(room);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
   }
  
   handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
   }
  
   handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
   }
   
}
