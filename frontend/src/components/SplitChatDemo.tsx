import AdminChat from "../pages/Chat";
import VendorChat from "../pages/VendorChat";

interface SplitChatDemoProps {
  darkMode: boolean;
}

export default function SplitChatDemo({
  darkMode,
}: SplitChatDemoProps) {
  return (
    <div style={styles.container}>
      {/* LEFT SIDE - ADMIN */}
      <div style={styles.left}>
        <AdminChat />
      </div>

      {/* RIGHT SIDE - VENDOR */}
      <div style={styles.right}>
        <VendorChat darkMode={darkMode} />
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100%",
  },

  left: {
    width: "50%",
    borderRight: "2px solid #ccc",
    overflow: "hidden",
  },

  right: {
    width: "50%",
    overflow: "hidden",
  },
};