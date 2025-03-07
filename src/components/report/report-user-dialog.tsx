import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Textarea,
  Checkbox,
  Radio,
} from "@material-tailwind/react";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { reportUserDialog } from "@/redux/features/offer/offerSlice";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { users } from "@/dummy/users";
import { chatService } from "@/services/chatService";
import { useAuth } from "@/utils/useAuth";

export default function ReportUserDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const chatId = useSelector((state: RootState) => state.chat.chatId);
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getCurrentUser } = useAuth()
  const user = getCurrentUser()

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        if (user) {
          const chatUsers = await chatService.getChatUsers(user.role);
          setUsers(chatUsers);
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load user data"
        );
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const currentUser = users.find((user: any) => user.id === chatId);

  return (
    <div>
      <Typography variant="h4">
        {currentUser ? currentUser.userName : "User"}
      </Typography>
      {/* Rest of your dialog content */}
    </div>
  );
}
