import React from 'react';

const About = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-primary text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-serif font-bold mb-6">Our Story</h1>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-serif font-bold">A Legacy of Luxury</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Serenia Parfums was founded with a singular vision: to create fragrances that transcend time and evoke profound emotions. Each scent is meticulously crafted by our master perfumers using only the finest, ethically-sourced ingredients from around the world.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                We believe that a fragrance is more than just a scent—it is an invisible accessory that tells your story, a memory captured in a bottle, and a statement of your unique identity.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <h4 className="text-3xl font-serif font-bold text-secondary">100+</h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2">Years of Heritage</p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif font-bold text-secondary">50+</h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2">Signature Scents</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000" 
                alt="Our workshop" 
                className="rounded-sm shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-accent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold mb-16">The Serenia Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-white shadow-sm rounded-sm">
              <h3 className="text-xl font-serif font-bold mb-4">Purity</h3>
              <p className="text-gray-500 text-sm leading-relaxed">We use only the most exceptional natural ingredients, sourced ethically from around the globe.</p>
            </div>
            <div className="p-8 bg-white shadow-sm rounded-sm">
              <h3 className="text-xl font-serif font-bold mb-4">Artistry</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Our master perfumers combine traditional techniques with modern innovation to create unique olfactory journeys.</p>
            </div>
            <div className="p-8 bg-white shadow-sm rounded-sm">
              <h3 className="text-xl font-serif font-bold mb-4">Sustainability</h3>
              <p className="text-gray-500 text-sm leading-relaxed">We are committed to eco-conscious packaging and supporting the communities that provide our raw materials.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
