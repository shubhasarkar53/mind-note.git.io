import { Box, Input, InputLabel, Modal } from "@mui/material";
import { useRecoilState } from "recoil";
import { modalAtom} from "../store/atoms/atoms";
import { FormEvent, useState } from "react";
import { useNoteFunctions } from "../store/hooks/noteHooks";
function DisplayModal() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalAtom);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // setSelectedNote(null);
  };

  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [type, setType] = useState<string>("random");
  const [text, setText] = useState<string>("");

  const {handleCreateNote} = useNoteFunctions()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("data:", { title, url, type, text });

    const isSuccess = await handleCreateNote({ title, link:url, type, text })
    
    if(isSuccess){
        handleCloseModal();
    }
  }

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="note-modal"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
          {/* Modal content will go here */}

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Add New Note</h4>
                <p className="text-sm text-muted-foreground">
                  Fields with * are mandetory.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <InputLabel htmlFor="title">Title*</InputLabel>
                  <Input
                    required={true}
                    id="title"
                    placeholder="Best resources for UI/UX"
                    className="col-span-2 h-8"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTitle(e.target.value)
                    }
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <InputLabel htmlFor="url">URL*</InputLabel>
                  <Input
                    required={true}
                    id="url"
                    placeholder="http://example.ui.com"
                    className="col-span-2 h-8"
                    value={url}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUrl(e.target.value)
                    }
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <InputLabel htmlFor="text">Text</InputLabel>
                  <Input
                    id="text"
                    placeholder="I have to learn it within 2 weeks"
                    className="col-span-2 h-8"
                    value={text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setText(e.target.value)
                    }
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <InputLabel htmlFor="type">Type</InputLabel>
                  <Input
                    id="type"
                    placeholder="Youtube"
                    className="col-span-2 h-8"
                    value={type}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setType(e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end items-center mt-4">
              <button className="btn-primary flex items-center space-x-2">
                Add to Mind
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default DisplayModal;
