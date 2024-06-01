
const ContactUs = ({ contactNumber, emailAddress }) => {
  return (
    <div className="contact-us-container bg-gray-100 py-12 rounded-lg">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-800 font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-800 font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-800 font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full border rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Phone:</span> {contactNumber}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Email:</span> {emailAddress}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Address:</span> Shantikunjo , Tangail 1920,
              Bangladesh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
