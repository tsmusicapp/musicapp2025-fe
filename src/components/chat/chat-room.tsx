import { IMessage, IChatRoom, IChatUser } from "@/types/chat";
import ComponentSwitcher from "../switcher/componentSwitcher";
import { Avatar, Typography, Spinner } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState, useCallback } from "react";
import { chatService } from "@/services/chatService";
import { formatDateTime } from "@/utils/utils";
import { useLocalStorage } from "@/context/LocalStorageContext";
import { fetchedOrders } from "@/redux/features/order/orderSlice";
import OfferRequest from "../offer/offer-request";
import OfferConfirmation from "../offer/offer-confimartion";
import OrderInfo from "../order/order-info";
import OrderInfoCard from "../order/order-info-card";
import OrderUploadedWorks from "../order/order-uploaded-works";
import OrderOngoingFreelancer from "../order/order-ongoing-freelancer";
import CancelOrderConfirmation from "../order/cancel-order-confirmation";
import CompleteDialogOrder from "../order/complete-dialog-order";
import RevisionDialogOrder from "../order/revision-dialog-order";
import RatingDialog from "../order/rating-dialog";
import ArbitrationDialog from "../order/arbitrationDialog";
import ReportDialog from "../report/report-dialog";
import ReportUserDialog from "../report/report-user-dialog";
import InvoiceDialog from "../invoice/invoice-dialog";

function ChatRoom() {
  const { getItem } = useLocalStorage()
  const dispatch = useDispatch<AppDispatch>()
  const auth = getItem<{ user: any }>("auth", {} as any);
  const currentUser = auth?.user;

  // const msgs = useSelector((state: RootState) => state.chat);
  const orders = useSelector((state: RootState) => state.order.order)
  console.log(orders, "order redux")
  const chatId = useSelector((state: RootState) => state.chat.chatId);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create a fetchMessages function that can be reused
  const fetchMessages = useCallback(async () => {
    if (!chatId) return;

    try {
      const response = await chatService.getChatMessages(currentUser?.id, chatId);
      console.log("Chat messages response:", response);

      // const formattedMessages = response.data.map((msg: IMessage) => ({
      //   id: msg.id || msg._id,
      //   sender: msg.sender,
      //   text: msg.text,
      //   createdAt: msg.createdAt,
      //   currentUser: msg.currentUser || undefined,
      //   isCard: msg.isCard || false,
      //   cardType: msg.cardType || "0",
      // }));
      // console.log("Formatted messages:", formattedMessages);

      if (response) {
        dispatch(fetchedOrders(response.orders))
        setMessages(response.chat.messages);
        setError(null);
      }
      return <Spinner className="w-6 h-6" />
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError(err instanceof Error ? err.message : "Failed to load messages");
    }
  }, [chatId]);

  // Initial load of messages
  useEffect(() => {
    const loadInitialMessages = async () => {
      setLoading(true);
      await fetchMessages();
      setLoading(false);
    };

    loadInitialMessages();
  }, [chatId, fetchMessages]);

  // Polling for new messages every 3 seconds
  useEffect(() => {
    if (!chatId) return;

    const pollInterval = setInterval(() => {
      fetchMessages();
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(pollInterval);
  }, [chatId, fetchMessages]);

  if (!chatId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center h-full ${error == "Failed to fetch chat messages" ? 'text-gray-500' : 'text-red-500'} `}>
        {error == "Failed to fetch chat messages" ? "Let's start the new conversation.." : error}
      </div>
    );
  }

  return (
    <div className="w-full py-2 overflow-hidden h-full overflow-y-auto">
      <CancelOrderConfirmation />
      <CompleteDialogOrder />
      <RevisionDialogOrder />
      <RatingDialog />
      <ArbitrationDialog />
      <ReportDialog />
      <ReportUserDialog />
      <InvoiceDialog />
      <div className="grid gap-4">
        {messages ?
          messages.map((message, index) => (
            <div
              key={message.id || index}
              className={`flex gap-2.5 px-2 ${message.sender === currentUser?.id ? "justify-end" : "justify-start"
                }`}
            >
              {!message.sender === currentUser?.id && (
                <Avatar
                  src="https://via.placeholder.com/150"
                  alt="avatar"
                  size="sm"
                />
              )}
              <div className="grid max-w-[25rem]">
                {message.text.split("||")[1] == "OrderRequestCard" ?
                  (orders ? orders?.map((item, ind) => {
                    return (
                      item.title == message.text.split("||")[0] ?
                        < ComponentSwitcher orderData={item} role={currentUser?.role} />
                        : <></>
                    )
                  }) : <></>)
                  // orders ? orders.map((order)=>{
                  //   <ComponentSwitcher componentType={"3"} />
                  // }): <Spinner className="w-6 h-6" />
                  : (
                    <div
                      className={`px-3 py-2 rounded ${message.sender === currentUser?.id ? "bg-blue-600" : "bg-blue-gray-200/20"
                        }`}
                    >
                      <Typography
                        className={`text-left text-sm font-normal leading-snug ${message.sender === currentUser?.id ? "text-white" : "text-black"
                          }`}
                      >
                        {message.text}
                      </Typography>
                    </div>
                  )}
                <div
                  className={`items-center inline-flex px-2 ${message.sender === currentUser?.id ? "justify-start" : "justify-end"
                    }`}
                >
                  <Typography className="text-gray-500 text-xs font-normal leading-4 py-1">
                    {formatDateTime(message.createdAt)}
                  </Typography>
                </div>
              </div>
            </div>
          )) : <Spinner className="h-8 w-8" />
        }
      </div>
    </div>
  );
}

export default ChatRoom;
