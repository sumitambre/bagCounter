import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Brand.jsx';

export default function Login() {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left brand panel */}
      <div className="lg:w-[55%] bg-navy-900 text-white p-10 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* subtle decorative rings */}
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full border border-white/5" />
        <div className="absolute -right-10 top-10 w-72 h-72 rounded-full border border-white/5" />

        <div className="relative z-10">
          <Logo dark />
        </div>

        <div className="relative z-10 max-w-lg">
          <p className="text-cement-400 font-semibold tracking-wide uppercase text-sm mb-4">
            Monitoring Console
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
            Cement bags,
            <br />
            <span className="text-cement-500">counted by AI.</span>
          </h1>
          <p className="text-slate-400 mt-6 text-lg leading-relaxed">
            Real-time computer vision tracking for cement bag transfers —
            count every bag moving in or out of your loading bays with precision.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          {['99.2% counting accuracy', 'Real-time tracking', 'In/Out counting'].map((chip) => (
            <span
              key={chip}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Right login card */}
      <div className="lg:w-[45%] bg-slate-50 flex items-center justify-center p-8">
        <form onSubmit={handleSignIn} className="w-full max-w-sm animate-slideUp">
          <h2 className="text-2xl font-bold text-navy-900">Sign in</h2>
          <p className="text-slate-500 mt-1 mb-8 text-sm">Welcome back. Please enter your credentials.</p>

          <label className="block text-sm font-medium text-slate-700 mb-1.5">Operator ID</label>
          <input
            type="text"
            defaultValue="operator@cementflow.com"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-cement-500 focus:ring-2 focus:ring-cement-500/20 outline-none transition mb-4"
          />

          <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
          <input
            type="password"
            defaultValue="demo1234"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-cement-500 focus:ring-2 focus:ring-cement-500/20 outline-none transition mb-4"
          />

          <div className="flex items-center justify-between text-sm mb-6">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-cement-500 focus:ring-cement-500" />
              Remember me
            </label>
            <a href="#" className="text-cement-600 font-medium hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-cement-500 hover:bg-cement-600 text-white font-semibold py-3 rounded-lg transition shadow-sm shadow-cement-500/30"
          >
            Sign In
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-xs text-slate-400">or</span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          <button
            type="submit"
            className="w-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            Continue with Company SSO
          </button>

          <p className="text-center text-xs text-slate-400 mt-8">
            Demo build · Any credentials will sign you in
          </p>
        </form>
      </div>
    </div>
  );
}
