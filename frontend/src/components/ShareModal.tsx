import { Box, Input, Modal } from "@mui/material";
import { Copy } from "lucide-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { sharableLinkAtom, shareModalAtom } from "../store/atoms/atoms";
import { useState } from "react";

function ShareModal() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(shareModalAtom);

    const [copied, setCopied] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
const sharableLink = useRecoilValue(sharableLinkAtom);
const handleCopy = (sharableLink: string) => {
    navigator.clipboard.writeText(sharableLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };


  return (
    <>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
          {
            sharableLink ?
            <div >
            <div>
              <div className="text-xl font-bold w-full">
                Share your mind note
              </div>
              <div className=" w-full flex justify-between my-4">
                <div></div>
                <Input  style={{color:"gray"}} type="text" readOnly className="w-[80%]" value={sharableLink}  />
                <button className="btn-primary" onClick={()=> handleCopy(sharableLink)}>
                  <Copy />
                </button>
              </div>
            </div>

            {copied && <div className="text-sm text-blue-600">Link copied!</div>}
          </div> :<div>Generating Link...</div>
          }
        </Box>
      </Modal>
    </>
  );
}

export default ShareModal;
