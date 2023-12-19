import React from "react";

function ContactPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="p-4 m-20">
      <h2 className="text-5xl text-orange font-bold mb-10 text-center">
        Contactez-nous
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-5">
          <div className="w-1/2 mr-4">
            <label htmlFor="name_field" className="block text-2xl text-orange">
              Votre nom:
            </label>
            <input
              className="w-full h-10 bg-orange text-beige"
              type="text"
              name="name"
              id="name_field"
              required
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="email_field" className="block text-2xl text-orange">
              Votre adresse email:
            </label>
            <input
              className="w-full h-10 bg-orange text-beige"
              type="email"
              name="email"
              id="email_field"
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Merci d'entrer une adresse email valide comme nom@exemple.com"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="message_field" className="block text-2xl text-orange">
            Message:
          </label>
          <textarea
            className="w-full h-40 bg-orange text-beige"
            name="message"
            id="message_field"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green py-3 px-3 text-2xl text-beige"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default ContactPage;
