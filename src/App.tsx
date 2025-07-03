import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";
import { HomePage } from "./pages/HomePage";
import { CampaignsPage } from "./pages/CampaignsPage";
import { AutomationsPage } from "./pages/AutomationsPage";
import { AudiencePage } from "./pages/AudiencePage";
import { CreatePage } from "./pages/CreatePage";
import { CreateCampaignPage } from "./pages/campaigns/CreateCampaignPage";
import { TemplatesPage } from "./pages/campaigns/TemplatesPage";
import { ABTestingPage } from "./pages/campaigns/ABTestingPage";
import { PrebuiltJourneysPage } from "./pages/automations/PrebuiltJourneysPage";
import { AllJourneysPage } from "./pages/automations/AllJourneysPage";
import { TransactionalEmailPage } from "./pages/automations/TransactionalEmailPage";
import { CustomerJourneysPage } from "./pages/automations/CustomerJourneysPage";
import { FormsPage } from "./pages/forms/FormsPage";
import { SignupFormsPage } from "./pages/forms/SignupFormsPage";
import { LandingPagesPage } from "./pages/forms/LandingPagesPage";
import { PopupsPage } from "./pages/forms/PopupsPage";
import { TagsPage } from "./pages/audience/TagsPage";
import { SegmentsPage } from "./pages/audience/SegmentsPage";
import { SurveysPage } from "./pages/audience/SurveysPage";
import { PreferencesPage } from "./pages/audience/PreferencesPage";
import { InboxPage } from "./pages/audience/InboxPage";
import { AnalyticsPage } from "./pages/analytics/AnalyticsPage";
import { WebsitePage } from "./pages/website/WebsitePage";
import { ContentPage } from "./pages/content/ContentPage";
import { IntegrationsPage } from "./pages/integrations/IntegrationsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              {/* Create Route */}
              <Route path="/create" element={<CreatePage />} />
              
              {/* Campaigns Routes */}
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route path="/campaigns/create" element={<CreateCampaignPage />} />
              <Route path="/campaigns/templates" element={<TemplatesPage />} />
              <Route path="/campaigns/ab-testing" element={<ABTestingPage />} />
              
              {/* Automations Routes */}
              <Route path="/automations" element={<AutomationsPage />} />
              <Route path="/automations/all-journeys" element={<AllJourneysPage />} />
              <Route path="/automations/prebuilt" element={<PrebuiltJourneysPage />} />
              <Route path="/automations/transactional" element={<TransactionalEmailPage />} />
              <Route path="/automations/customer-journeys" element={<CustomerJourneysPage />} />
              
              {/* Forms Routes */}
              <Route path="/forms" element={<FormsPage />} />
              <Route path="/forms/signup" element={<SignupFormsPage />} />
              <Route path="/forms/landing" element={<LandingPagesPage />} />
              <Route path="/forms/popups" element={<PopupsPage />} />
              
              {/* Audience Routes */}
              <Route path="/audience" element={<AudiencePage />} />
              <Route path="/audience/tags" element={<TagsPage />} />
              <Route path="/audience/segments" element={<SegmentsPage />} />
              <Route path="/audience/surveys" element={<SurveysPage />} />
              <Route path="/audience/preferences" element={<PreferencesPage />} />
              <Route path="/audience/inbox" element={<InboxPage />} />
              
              {/* Analytics Routes */}
              <Route path="/analytics" element={<AnalyticsPage />} />
              
              {/* Website Routes */}
              <Route path="/website" element={<WebsitePage />} />
              
              {/* Content Routes */}
              <Route path="/content" element={<ContentPage />} />
              
              {/* Integrations Routes */}
              <Route path="/integrations" element={<IntegrationsPage />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
