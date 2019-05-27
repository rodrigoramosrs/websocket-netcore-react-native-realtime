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
        public ContentType ContentType { get; set; }
        public string ContentValue { get; set; }
    }

    public enum ContentType
    {
        APPLICATION_JSON = 0,
		APPLICATION_OCTET_STREAM = 10,
		APPLICATION_BASE64 =  20,
		APPLICATION_XML = 30,
		AUDIO_MPEG = 40,
		AUDIO_OGG = 50,
		AUDIO =  60,
		VIDEO_MP4  = 70,
		TEXT_PLAIN = 80,
		TEXT_HTML = 90,
		IMAGE_JPEG = 100,
		IMAGE_PNG =  110,

    }

    public enum ActionType
    {
        APP_CONNECTED = 0, // Envia um comando informando que o app conectou na sessão
        APP_DISCONNECTED = 1, // Envia um comando informando que o app desconectou  da sessão
        HOST_CONNECTED = 2, // Envia um comando para o app informando que o host conectou
        HOST_DISCONNECTED = 3, // Envia um comando para o app informando que o host desconectou

        STATE_CHANGED = 5, // Envia uma acao remota para informar o novo estado;

        ATALHO_ACAO_LAUDAR = 20, //Comando para executar ação remota (ex. laudar, revisar, assinar)
        ATALHO_ACAO_REVISAR = 21, //Comando para executar ação remota (ex. laudar, revisar, assinar)
        ATALHO_ACAO_LAUDAR_REVISAR = 22, //Comando para executar ação remota (ex. laudar, revisar, assinar)

        RECONHECIMENTO_VOZ_STT = 30, // Comando para enviar o texto reconhecido de um audio STT

        ENVIAR_TEXTO_LAUDO = 40, // Comando para enviar o conteúdo de texto para o editor.

        DITADO_AUDIO = 50, //Comando para enviar Audio Ditado

        PEDIDO_MEDICO_ANEXO = 60, // Comando para enviar Anexo (pedido médico)

        COMANDO_ASSISTENTE = 70, // Comando de texto para enviar uma ação que será interpretada pelo assistente
    
}

}
