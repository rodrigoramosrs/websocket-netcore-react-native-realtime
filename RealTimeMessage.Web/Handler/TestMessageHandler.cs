using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using WebSocketManager;

namespace RealTimeMessage.Web
{
    public class TestMessageHandler : WebSocketHandler
    {
        public TestMessageHandler(WebSocketConnectionManager webSocketConnectionManager) : base(webSocketConnectionManager)
        {
        }

        public override async Task OnConnected(WebSocket socket, string roomID)
        {
            await base.OnConnected(socket, roomID);

            var socketId = WebSocketConnectionManager.GetConnectionIDFromConnection(socket);
            
            await SendMessageToRoomAsync($"{socketId} is now connected to room {roomID}", roomID);
        }

        public override async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            var socketId = WebSocketConnectionManager.GetConnectionIDFromConnection(socket);
            var roomID = WebSocketConnectionManager.GetRoomIDFromConnection(socket);


            var message = Encoding.UTF8.GetString(buffer, 0, result.Count); //$"{socketId} - room {roomID} said: {Encoding.UTF8.GetString(buffer, 0, result.Count)}";

            await SendMessageToRoomAsync(message, roomID);
        }

        public override async Task OnDisconnected(WebSocket socket)
        {
            var socketId = WebSocketConnectionManager.GetConnectionIDFromConnection(socket);
            var roomID = WebSocketConnectionManager.GetRoomIDFromConnection(socket);

            await base.OnDisconnected(socket);
            await SendMessageToRoomAsync($"{socketId} disconnected", roomID);
        }
    }
}
