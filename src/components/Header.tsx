const logoUrl =
  "https://vzfzqtrfktrvnxdykrbn.supabase.co/storage/v1/object/public/imagesMomboss/assets/The%20boss%20room%20vip%20white-001.png";

function Header() {
  return (
    <div className="bg-bossDark p-6 text-white font-bold flex justify-center">
      <img
        className="inline h-20 py-0"
        src={logoUrl}
        alt="logo for The BossBoard"
      />
    </div>
  );
}

export default Header;
