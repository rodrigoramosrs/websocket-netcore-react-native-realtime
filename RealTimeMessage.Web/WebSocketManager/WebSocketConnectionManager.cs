using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace WebSocketManager
{

    public class RoomModel
    {
        public string ID { get; set; }

        public ConcurrentDictionary<string, WebSocket> Sockets = new ConcurrentDictionary<string, WebSocket>();
    }

    public class WebSocketConnectionManager
    {

        private ConcurrentDictionary<string, RoomModel> _rooms = new ConcurrentDictionary<string, RoomModel>();

        public WebSocket GetSocketById(string id, string RoomID)
        {
            return _rooms.FirstOrDefault(p => p.Key == RoomID).Value
                .Sockets.FirstOrDefault(p => p.Key == id).Value;
        }

        public ConcurrentDictionary<string, WebSocket> GetAll()
        {
            return _rooms.FirstOrDefault().Value.Sockets;
        }

        public ConcurrentDictionary<string, WebSocket> GetAll(string RoomID)
        {
            var room = _rooms.FirstOrDefault(x => x.Key == RoomID).Value;
            if (room != null) return room.Sockets;
            return null;
        }

        public string GetId(WebSocket socket, string RoomID)
        {
            return _rooms.FirstOrDefault(p => p.Key == RoomID).Value.Sockets
            .FirstOrDefault(p => p.Value == socket).Key;
        }
        public string AddSocket(WebSocket socket, string RoomID)
        {
            string id = CreateConnectionId();

            if (_rooms.FirstOrDefault(x => x.Key == RoomID).Value == null)
                _rooms.TryAdd(RoomID, new RoomModel() { ID = RoomID, Sockets = new ConcurrentDictionary<string, WebSocket>()});

            if(_rooms.FirstOrDefault(x => x.Key == RoomID).Value.Sockets.TryAdd(id, socket)) return id;

            return null;
        }

        public async Task RemoveSocket(string id, string RoomID)
        {
            WebSocket socket;
            _rooms.FirstOrDefault(x => x.Key == RoomID).Value.Sockets.TryRemove(id, out socket);

            await socket.CloseAsync(closeStatus: WebSocketCloseStatus.NormalClosure,
                                    statusDescription: "Closed by the WebSocketManager",
                                    cancellationToken: CancellationToken.None);

            if (_rooms.FirstOrDefault(x => x.Key == RoomID).Value.Sockets.Count <= 0)
            {
                RoomModel room;
                _rooms.TryRemove(RoomID, out room);
            }
        }

        public string GetRoomIDFromConnectionID(string id)
        {
            foreach (var room in _rooms)
            {
                foreach (var socket in room.Value.Sockets)
                {
                    if (socket.Key == id)
                        return room.Key;
                }
            }
            return "";
        }
        public string GetRoomIDFromConnection(WebSocket ws)
        {
            foreach (var room in _rooms)
            {
                foreach (var socket in room.Value.Sockets)
                {
                    if (socket.Value == ws)
                        return room.Key;
                }
            }
            return "";
        }

        public string GetConnectionIDFromConnection(WebSocket ws)
        {
            foreach (var room in _rooms)
            {
                foreach (var socket in room.Value.Sockets)
                {
                    if (socket.Value == ws)
                        return socket.Key;
                }
            }
            return "";
        }
        public WebSocket GetConnectionFromID(string id)
        {
            foreach (var room in _rooms)
            {
                foreach (var socket in room.Value.Sockets)
                {
                    if (socket.Key == id)
                        return socket.Value;
                }
            }
            return null;
        }

        private string CreateConnectionId()
        {
            return Guid.NewGuid().ToString();
        }
    }

    /*
    public class WebSocketConnectionManager
    {
        private ConcurrentDictionary<string, WebSocket> _sockets = new ConcurrentDictionary<string, WebSocket>();

        public WebSocket GetSocketById(string id)
        {
            return _sockets.FirstOrDefault(p => p.Key == id).Value;
        }

        public ConcurrentDictionary<string, WebSocket> GetAll()
        {
            return _sockets;
        }

        public string GetId(WebSocket socket)
        {
            return _sockets.FirstOrDefault(p => p.Value == socket).Key;
        }
        public string AddSocket(WebSocket socket)
        {
            string id = CreateConnectionId();
            if (_sockets.TryAdd(id, socket)) return id;
            return null;
        }

        public async Task RemoveSocket(string id)
        {
            WebSocket socket;
            _sockets.TryRemove(id, out socket);

            await socket.CloseAsync(closeStatus: WebSocketCloseStatus.NormalClosure, 
                                    statusDescription: "Closed by the WebSocketManager", 
                                    cancellationToken: CancellationToken.None);
        }

        private string CreateConnectionId()
        {
            return Guid.NewGuid().ToString();
        }
    }*/
}
