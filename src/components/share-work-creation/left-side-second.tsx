import { useState } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { musicBackgroundDialog } from "@/redux/features/offer/offerSlice";
import { PenLine } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import RichTextEditor from "../ui/RichTextEditor";

interface LeftSideSecondProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
}

function LeftSideSecond({ register, errors, setValue }: LeftSideSecondProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [selectedBackground, setSelectedBackground] = useState<string>("");

  const handleBackgroundSelect = () => {
    dispatch(musicBackgroundDialog());
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setValue("musicLyric", editorContent);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mb-12 flex flex-col gap-4 mt-6 items-start justify-start">
      <div className="flex flex-col gap-10 ">
        {/* Lyric Editor Button */}
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleOpenModal}
              className="bg-blue-500 hover:bg-blue-600 text-white w-[10rem] h-[3rem] flex items-center gap-2"
            >
              <PenLine className="w-4 h-4" />
              Edit Lyrics
            </Button>
            {errors.musicLyric && (
              <span className="text-red-500 text-xs">
                {errors.musicLyric.message as string}
              </span>
            )}
          </div>
        </div>

        {/* Hidden input for form compatibility */}
        <input type="hidden" {...register("musicLyric")} />
      </div>
      <div className="flex justify-start items-start gap-2 w-full  h-[70px] my-6">
        <button
          className="bg-blue-200 text-blue-600 normal-case w-[16rem] flex items-center px-2"
        >
          <span className="text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-blue-800">
            PRO
          </span>
          Upgrade to gain more attention
        </button>
      </div>

      {/* Rich Text Editor Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[800px] w-[90vw]">
          <DialogHeader>
            <DialogTitle>Write Your Lyrics</DialogTitle>
          </DialogHeader>
          <div className="min-h-[400px] max-h-[70vh] overflow-y-auto">
            <RichTextEditor value={editorContent} onChange={setEditorContent} />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Save Lyrics
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LeftSideSecond;
