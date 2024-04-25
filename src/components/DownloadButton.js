function DownloadButton({ url }) {
    return (
      <a href={url} download>
        <button>Download Audio</button>
      </a>
    );
  }

export default DownloadButton