import { Button, Modal, Progress } from "antd";
import { useTranslation } from "react-i18next";
import "./FileUploadModal.css";

function FileUploadModal({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImage,
  currentImage,
  progress,
}) {
  const { t, i18n } = useTranslation("global");
  return (
    <div>
      <Modal
        title={t("header.modalProfile")}
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            disabled={currentImage.name ? false : true}
            key="submit"
            type="primary"
            onClick={uploadImage}
          >
            {t("button.modalProfileTwo")}
          </Button>,
        ]}
      >
        <div className="image-upload-main">
          <p>{currentImage.name}</p>
          <label className="upload-btn" for="image-upload">
            {t("button.modalProfile")}
          </label>
          {progress === 0 ? (
            <></>
          ) : (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}
          <input hidden id="image-upload" type={"file"} onChange={getImage} />
        </div>
      </Modal>
    </div>
  );
}

export default FileUploadModal;
