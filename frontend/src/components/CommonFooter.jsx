import React from "react";

const CommonFooter = () => {
  return (
    <footer className="bg-gray-100 p-5 font-sans text-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Help Section */}
        <div className="mb-5">
          <h4 className="text-base font-medium mb-2">Help</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Help Center",
              "Disputes & Reports",
              "Return & refund policy",
              "Report IPR infringement",
              "Regulated Information",
              "Integrity Compliance",
              "Transparency Center",
              "Submit report (non-registered users)"
            ].map((item) => (
              <li key={item} className="text-sm text-gray-600 hover:text-orange-500 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Multi-Language Sites */}
        <div className="mb-5">
          <h4 className="text-base font-medium mb-2">AllExpress Multi-Language Sites</h4>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {[
              "Russian", "Portuguese", "Spanish", "French", "German",
              "Italian", "Dutch", "Turkish", "Japanese", "Korean",
              "Thai", "Vietnamese", "Arabic", "Hebrew", "Polish"
            ].map((language) => (
              <li key={language} className="text-sm text-gray-600 hover:text-orange-500 cursor-pointer">
                {language}
              </li>
            ))}
          </ul>
        </div>

        {/* Browse by Category */}
        <div className="mb-5">
          <h4 className="text-base font-medium mb-2">Browse by Category</h4>
          <ul className="grid grid-cols-2 gap-2">
            {[
              "All Popular", "Product", "Promotion", "Low Price",
              "Great Value", "Reviews", "Blog", "Video"
            ].map((category) => (
              <li key={category} className="text-sm text-gray-600 hover:text-orange-500 cursor-pointer">
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Alibaba Group */}
        <div className="mb-5">
          <h4 className="text-base font-medium mb-2">Alibaba Group</h4>
          <ul className="grid grid-cols-2 gap-2">
            {[
              "Alibaba Group Website", "AllExpress", "Alimama", "Alipay",
              "Fliggy", "Alibaba Cloud", "Alibaba International", "AllTelecom",
              "DingTalk", "Juhuasuan", "Taobao Marketplace", "Tmall",
              "Taobao Global", "AliOS", "1688"
            ].map((item) => (
              <li key={item} className="text-sm text-gray-600 hover:text-orange-500 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 pt-5 border-t border-gray-300">
        <div className="flex flex-wrap gap-3 mb-4">
          {[
            "Intellectual Property Protection",
            "Privacy Policy",
            "Sitemap",
            "Terms of Use",
            "Information for EU consumers",
            "Imprint",
            "Transaction Services Agreement for non-EU/UK Consumers",
            "Terms and Conditions for EU/EEA/UK Consumers",
            "User Information Legal Enquiry Guide"
          ].map((item) => (
            <span key={item} className="text-xs text-gray-600 hover:text-orange-500 cursor-pointer">
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
          <span>© 2010-2025 AllExpress.com. All rights reserved.</span>
          <span>💬 增值电信业务经营许可证 浙B2-20120091-8</span>
          <span>💬 浙公网安备 33010802002248号</span>
        </div>
      </div>
    </footer>
  );
};

export default CommonFooter;