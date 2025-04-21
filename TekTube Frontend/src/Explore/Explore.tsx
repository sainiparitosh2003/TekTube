import { useState } from "react";
import Header from "../Header/Header";
import { CategoryPills } from "./components/CategoryPills";
import { categories, videos } from "./data/home";
import { Sidebar } from "./layouts/Sidebar";
import { SidebarProvider } from "./contexts/SidebarContext";
import { VideoGridItem } from "./components/VideoGridItem";
import { PageHeader } from "./layouts/PageHeader";

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-500 font-['Poppins'] flex flex-col">
        <Header />
        <PageHeader/>
        {/* Main Layout with Sidebar & Video Content */}
        <div className="flex flex-grow overflow-hidden">
          {/* Sidebar (Fixed Width) */}
          <div className="w-[240px] flex-shrink-0">
            <Sidebar />
          </div>

          {/* Video Content (Flexible Width) */}
          <div className="flex-1 overflow-y-auto px-8 pb-4 mt-4">
            <div className="sticky top-0 bg-gray-500 z-10 pb-4">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            {/* Video Grid */}
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map((video) => (
                <VideoGridItem key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Explore;
