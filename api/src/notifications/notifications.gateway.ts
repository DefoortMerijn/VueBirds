import { LivelocationsService } from 'src/livelocations/livelocations.service'
import { LocationsService } from 'src/locations/locations.service'
import { WsException } from '@nestjs/websockets/errors'
import { Server, Socket } from 'socket.io'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets'
import { ConnectedSocket, MessageBody } from '@nestjs/websockets/decorators'
import { CreateLivelocationInput } from 'src/livelocations/dto/create-livelocation.input'
import { Livelocation } from 'src/livelocations/entities/livelocation.entity'
import { UsePipes, ValidationPipe } from '@nestjs/common'
import { MyWebSocketValidationPipe } from 'src/bootstrap/exceptions/MyWebSocketValidationPipe'

@WebSocketGateway(3004)
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly livelocationService: LivelocationsService,
    private readonly locationService: LocationsService,
  ) {}

  @WebSocketServer()
  server: Server

  numberOfClients: number = 0

  handleDisconnect(client: any) {
    this.numberOfClients--
    // Notify connected clients of current users
    this.server.emit('users:userLeaving ', {
      disconnectedUsers: this.numberOfClients,
    })
    console.log('A client has disconnected')
    console.log(`Number of clients: ${this.numberOfClients}`)
  }
  handleConnection(client: any, ...args: any[]) {
    this.numberOfClients++
    // Notify connected clients of current users
    this.server.emit('users:newuserconnected', {
      connectedUsers: this.numberOfClients,
    })
    console.log('A client has connected')
    console.log(`Number of clients: ${this.numberOfClients}`)
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(payload)
    throw new WsException('Methode not implemented')

    return 'General Kenobi!'
  }
  @UsePipes(new MyWebSocketValidationPipe())
  @SubscribeMessage('birdspotter:moving')
  async handleBirdspotterMoving(
    @MessageBody() data: CreateLivelocationInput,
    @ConnectedSocket() client: Socket,
  ): Promise<Livelocation> {
    console.log(data)
    const liveLoc = await this.livelocationService.create(data)

    const l = await this.locationService.findLocationByPoint(
      liveLoc.geolocation,
    )

    if (l.length > 0) {
      const nameArea = l[0].name
      console.log('in a known area/location', nameArea)

      console.log('put in room')
      console.log(`Rooms of this client:`, client.rooms)
      //add client to room
      client.join(nameArea)
      console.log(`Rooms of this client:`, client.rooms)
      //send to all clients in room, except sender
      //client.to(nameArea).emit('birdspotter:newlocation', liveLoc)
      //send to all clients in room, including sender
      this.server
        .to(nameArea)
        .emit('birdspotter:newlocation', { location: liveLoc, room: nameArea })
    } else {
      console.log('not in a known area/location')
    }
    return Promise.resolve(liveLoc)
  }
}
