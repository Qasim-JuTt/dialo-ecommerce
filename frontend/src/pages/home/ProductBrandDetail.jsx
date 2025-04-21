import { useRef, useState } from 'react';

const specs = {
  basic: [
    { name: 'Applicable Season', value: 'Four Seasons' },
    { name: 'Applicable Scene', value: 'CASUAL' },
    { name: 'Model Number', value: '40' },
    { name: 'Closure Type', value: 'Elastic Waist' },
    { name: 'Decoration', value: 'PATCHWORK' },
    { name: 'Place Of Origin', value: 'China (mainland)' },
  ],
  additional: [
    { name: 'Material', value: 'Cotton' },
    { name: 'Pattern Type', value: 'Patchwork' },
    { name: 'Style', value: 'Casual' },
    { name: 'Gender', value: 'Unisex' },
    { name: 'Size', value: 'M, L, XL' },
    { name: 'Color', value: 'Multicolor' },
  ],
};

const sizeChart = [
  ['M', '62 (Max stretch 84)', '106', '98', '18', '165/170', '47.5–57.5kg'],
  ['L', '66 (Max stretch 88)', '110', '100', '20', '170/175', '57.5–65kg'],
  ['XL', '70 (Max stretch 92)', '114', '102', '22', '170/175', '65–72.5kg'],
  ['2XL', '74 (Max stretch 96)', '118', '104', '24', '175/180', '72.5–80kg'],
  ['3XL', '78 (Max stretch 100)', '122', '106', '26', '175/180', '80–90kg'],
];

const Section = ({ title, children, innerRef }) => (
  <section ref={innerRef} className="mb-10">
    <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-700">{title}</h3>
    {children}
  </section>
);

const SpecTable = ({ items }) => (
  <table className="w-full">
    <tbody>
      {items.map(({ name, value }, i) => (
        <tr key={i} className="border-b border-gray-200">
          <td className="py-2 px-1 md:px-4 font-medium text-gray-600 w-1/2">{name}</td>
          <td className="py-2 px-1 md:px-4 text-gray-800">{value}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const SizeChart = () => (
  <table className="w-full text-sm text-left border border-gray-300">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        {['Size', 'Waist', 'Hip', 'Pants Length', 'Trousers', 'Height', 'Weight'].map((label, i) => (
          <th key={i} className="py-2 px-2 border">{label}</th>
        ))}
      </tr>
    </thead>
    <tbody className="text-gray-800">
      {sizeChart.map((row, i) => (
        <tr key={i}>
          {row.map((cell, j) => (
            <td key={j} className="py-1 px-2 border">{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const ScrollNav = ({ onScroll, activeSection }) => {
  const labels = ['Customer Reviews', 'Specifications', 'Description', 'Store', 'More to love'];
  
  return (
    <div className="flex space-x-6 mb-6 border-b pb-2 text-gray-600 font-medium text-sm md:text-base">
      {labels.map((label) => (
        <button
          key={label}
          onClick={() => onScroll(label)}
          className={`flex items-center ${activeSection === label ? 'text-blue-600' : 'hover:text-black'}`}
        >
          {activeSection === label && (
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
          {label}
        </button>
      ))}
    </div>
  );
};

const ProductBrandDetails = () => {
  const [showMore, setShowMore] = useState(false);
  const [showMoreImages, setShowMoreImages] = useState(false);
  const [activeSection, setActiveSection] = useState('Customer Reviews');

  const refs = {
    'Customer Reviews': useRef(null),
    'Specifications': useRef(null),
    'Description': useRef(null),
    'Store': useRef(null),
    'More to love': useRef(null),
  };

  const scrollTo = (key) => {
    setActiveSection(key);  // Update active section
    refs[key]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white rounded-lg p-4 md:p-6">
      <ScrollNav onScroll={scrollTo} activeSection={activeSection} />

      <Section title="Customer Reviews" innerRef={refs['Customer Reviews']}>
        <p className="text-gray-600">No customer reviews yet.</p>
      </Section>

      <Section title="Specifications" innerRef={refs['Specifications']}>
        <div className="overflow-x-auto">
          <SpecTable items={specs.basic} />
          {showMore && <SpecTable items={specs.additional} />}
        </div>
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          {showMore ? 'View less' : 'View more'}
          <svg
            className={`ml-1 w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </Section>

      <Section title="Description" innerRef={refs['Description']}>
        <p className="text-gray-700 text-sm leading-relaxed mb-6">
          <strong>TIPS</strong><br />
          Please buy and chat with the seller and ask about the size. Size standards differ by country.
          <br /><br />
          High quality means a higher price—and there’s a reason. Contact us with your height and weight for the best fit recommendations.
          <br /><br />
          Discover a wide range of global products at amazing prices!
          <br /><br />
          Your social-inspired style obsession.
        </p>

        <div className="overflow-x-auto mb-6">
          <SizeChart />
        </div>

        <div className="text-center">
          <img
            src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60"
            alt="Preview Shorts"
            className="mx-auto w-[600px] md:w-[600px]  max-h-[650px] rounded-md"
          />
          {showMoreImages && (
            <div className="mt-4">
              <img
                src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60"
                alt="More Preview"
                className="mx-auto w-[600px]  max-h-[650px] md:w-[600px] rounded-md"
              />
            </div>
          )}
          <button
            onClick={() => setShowMoreImages(!showMoreImages)}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto"
          >
            {showMoreImages ? 'View less' : 'View more'}
            <svg
              className={`ml-1 w-4 h-4 transition-transform ${showMoreImages ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </Section>

      <Section title="Store" innerRef={refs['Store']}>
        <h3>Store Details Here</h3>
      </Section>

      <Section title="More to love" innerRef={refs['More to love']}>
        <p className="text-gray-600">Explore more items like this one.</p>
      </Section>
    </div>
  );
};

export default ProductBrandDetails;
