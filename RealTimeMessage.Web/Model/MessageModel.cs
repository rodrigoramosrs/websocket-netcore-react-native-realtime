using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealTimeMessage.Web.Model
{
    public class MessageModel
    {
        public string CurrentID { get; set; }
        public string RoomID { get; set; }

        public MessageContent MessageContent { get; set; }
    }

    public class MessageContent
    {
        public ActionType ActionType { get; set; }
        public MessageType MessageType { get; set; }
        public string Value { get; set; }
    }

    public enum MessageType
    {
        TEXT = 0,
        BASE64 = 1
    }

    public enum ActionType
    {
        STATE_CHANGE = 0, // Envia uma acao remota para informar o novo estado;
        APP_CONNECTED = 1, // Envia um comando informando que o app conectou na sessão
        APP_DISCONNECTED = 2, // Envia um comando informando que o app desconectou  da sessão
        HOST_CONNECTED = 3, // Envia um comando para o app informando que o host conectou
        HOST_DISCONNECTED = 4, // Envia um comando para o app informando que o host desconectou

        ATALHO_ACAO = 20, //Comando para executar ação remota (ex. laudar, revisar, assinar)
        RECONHECIMENTO_VOZ_STT = 21, // Comando para enviar o texto reconhecido de um audio STT
        ENVIAR_TEXTO_LAUDO = 22, // Comando para enviar o conteúdo de texto para o editor.
        DITADO_AUDIO = 23, //Comando para enviar Audio Ditado
        PEDIDO_MEDICO_ANEXO = 24, // Comando para enviar Anexo (pedido médico)
        COMANDO_ASSISTENTE = 25, // Comando de texto para enviar uma ação que será interpretada pelo assistente
    }

}
