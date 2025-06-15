import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';
const Footer=()=>{
  return(
    <footer className="fixed bottom-0 w-full z-10 bg-purple-900 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-center space-x-6 text-white text-base">
        <span>Emotion Companion © {new Date().getFullYear()}</span>
        <a href="mailto:aayushi_b@ch.iitr.ac.in" title="Email" aria-label="Email" className="hover:text-pink-400 transition">
          <FaEnvelope className="text-lg"/>
        </a>
        <a href="https://github.com/aayushi0911" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub" className="hover:text-pink-400 transition">
          <FaGithub className="text-lg"/>
        </a>
        <a href="https://www.linkedin.com/in/aayushi-bhardwaj-98b0a230a" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn" className="hover:text-pink-400 transition">
          <FaLinkedin className="text-lg"/>
        </a>
        <a href="https://www.instagram.com/aayushi.1911/"target="_blank"rel="noopener noreferrer"title="Instagram"aria-label="Instagram"className="hover:text-pink-400 transition">
          <FaInstagram className="text-lg"/>
        </a>
      </div>
    </footer>
  );
};
export default Footer;
