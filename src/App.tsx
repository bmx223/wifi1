import React, { useState } from 'react';
import { 
  Wifi, 
  Rocket, 
  Clock, 
  Coffee, 
  Sun, 
  Flame, 
  Crown, 
  MessageCircle, 
  Smartphone, 
  CheckCircle2,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [code, setCode] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    
    setIsConnecting(true);
    // Simulation of connection delay
    setTimeout(() => {
      setIsConnecting(false);
      setConnectionStatus('success');
      // In a real captive portal, this would submit the form to the router
    }, 2000);
  };

  const offers = [
    {
      id: 1,
      title: "Pass Express",
      duration: "1 Heure",
      price: "100 FCFA",
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      color: "border-blue-100 bg-blue-50/50",
      highlight: false
    },
    {
      id: 2,
      title: "Pass Détente",
      duration: "3 Heures",
      price: "200 FCFA",
      icon: <Coffee className="w-6 h-6 text-teal-500" />,
      color: "border-teal-100 bg-teal-50/50",
      highlight: false
    },
    {
      id: 3,
      title: "Pass Journée",
      duration: "24 Heures",
      price: "400 FCFA",
      icon: <Sun className="w-6 h-6 text-orange-500" />,
      color: "border-orange-200 bg-orange-50",
      highlight: true,
      badge: "MEILLEURE OFFRE"
    },
    {
      id: 4,
      title: "Pass Hebdo",
      duration: "1 Semaine",
      price: "1 500 FCFA",
      icon: <Flame className="w-6 h-6 text-red-500" />,
      color: "border-red-100 bg-red-50/50",
      highlight: false
    },
    {
      id: 5,
      title: "Pass VIP",
      duration: "1 Mois",
      price: "4 000 FCFA",
      icon: <Crown className="w-6 h-6 text-purple-500" />,
      color: "border-purple-100 bg-purple-50/50",
      highlight: false
    }
  ];

  const [selectedOffer, setSelectedOffer] = useState<typeof offers[0] | null>(null);
  const [paymentStep, setPaymentStep] = useState<'input' | 'processing' | 'success'>('input');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'orange' | 'moov'>('orange');

  const handleBuyClick = (offer: typeof offers[0]) => {
    setSelectedOffer(offer);
    setPaymentStep('input');
    setPhoneNumber('');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    
    setPaymentStep('processing');
    // Simulation of payment API call
    setTimeout(() => {
      setPaymentStep('success');
    }, 3000);
  };

  const closePaymentModal = () => {
    setSelectedOffer(null);
    setPaymentStep('input');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900 pb-20">
      
      {/* Payment Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">Achat Automatique</h3>
              <button onClick={closePaymentModal} className="text-slate-400 hover:text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {paymentStep === 'input' && (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className={`p-2 rounded-lg ${selectedOffer.color} bg-white`}>
                      {selectedOffer.icon}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{selectedOffer.title}</p>
                      <p className="text-sm text-slate-500">{selectedOffer.duration} • {selectedOffer.price}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-700">Choisissez votre moyen de paiement</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('orange')}
                        className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'orange' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-slate-200 hover:border-orange-200'}`}
                      >
                        <span className="font-bold text-sm">Orange Money</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('moov')}
                        className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'moov' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-blue-200'}`}
                      >
                        <span className="font-bold text-sm">Moov Money</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Votre numéro de téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-lg"
                      placeholder="Ex: 77 00 00 00"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                  >
                    Payer {selectedOffer.price}
                  </button>
                </form>
              )}

              {paymentStep === 'processing' && (
                <div className="text-center py-8 space-y-6">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Veuillez valider le paiement</h4>
                    <p className="text-slate-500 text-sm px-4">
                      Une demande de paiement a été envoyée au <span className="font-mono font-bold text-slate-700">{phoneNumber}</span>. 
                      <br/>Veuillez confirmer sur votre téléphone.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 text-orange-800 text-xs rounded-lg animate-pulse">
                    En attente de validation USSD...
                  </div>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="text-center py-4 space-y-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-green-700 mb-2">Paiement Réussi !</h4>
                    <p className="text-slate-500 text-sm">Voici votre code de connexion :</p>
                  </div>
                  
                  <div className="bg-slate-100 p-6 rounded-xl border-2 border-dashed border-slate-300 relative group cursor-pointer" onClick={() => {navigator.clipboard.writeText('WIFI-8392'); alert('Code copié !')}}>
                    <p className="font-mono text-3xl font-black text-slate-900 tracking-widest">WIFI-8392</p>
                    <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-wider">Cliquez pour copier</p>
                  </div>

                  <button
                    onClick={() => {
                      setCode('WIFI-8392');
                      closePaymentModal();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Utiliser ce code maintenant
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Header Section */}
      <header className="bg-white pt-8 pb-6 px-4 text-center shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-orange-500 to-green-500"></div>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-200"
        >
          <Rocket className="text-white w-8 h-8" />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold font-display text-slate-900 mb-2"
        >
          Bienvenue sur <span className="text-blue-600">WIFI DAMOU</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-500 text-sm font-medium max-w-xs mx-auto"
        >
          « Le plaisir de naviguer à la vitesse de l'éclair avec Starlink ! »
        </motion.p>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-8">
        
        {/* Connection Zone */}
        <section className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Wifi className="w-24 h-24 text-blue-600" />
          </div>
          
          <h2 className="text-lg font-semibold text-center mb-6 relative z-10">Connexion au réseau</h2>
          
          {connectionStatus === 'success' ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-green-700 font-bold text-lg">Connecté avec succès !</p>
              <p className="text-slate-500 text-sm mt-1">Vous pouvez maintenant naviguer.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleConnect} className="space-y-4 relative z-10">
              <div>
                <label htmlFor="code" className="sr-only">Code secret</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Zap className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="block w-full pl-11 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors placeholder:text-slate-400"
                    placeholder="Entrez votre code secret ici"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isConnecting}
                className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-orange-200 text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
              >
                {isConnecting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    CONNEXION...
                  </span>
                ) : (
                  "SE CONNECTER"
                )}
              </button>
            </form>
          )}
        </section>

        {/* Pricing Grid */}
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-display font-bold text-lg text-slate-800">Nos Offres</h3>
            <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-1">
              <Wifi className="w-3 h-3" /> Starlink
            </span>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {offers.map((offer) => (
              <motion.div
                key={offer.id}
                whileHover={{ y: -2 }}
                className={`relative bg-white rounded-xl p-4 border-2 ${offer.highlight ? 'border-orange-400 shadow-md ring-1 ring-orange-100' : 'border-slate-100 shadow-sm'} transition-all`}
              >
                {offer.highlight && (
                  <div className="absolute -top-3 right-4 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide">
                    {offer.badge}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${offer.color}`}>
                      {offer.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{offer.title}</h4>
                      <p className="text-sm font-medium text-slate-500">{offer.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-900 font-display tracking-tight">{offer.price}</p>
                    <button 
                      onClick={() => handleBuyClick(offer)}
                      className="mt-2 px-4 py-1.5 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold rounded-full shadow-md shadow-orange-200 hover:from-orange-600 hover:to-red-700 transition-all transform active:scale-95"
                    >
                      ACHETER
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How to Buy Section */}
        <section className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-900/10">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="w-6 h-6 text-orange-400" />
            <h3 className="font-bold text-lg">Comment acheter un code ?</h3>
          </div>
          
          <div className="space-y-4 text-slate-300 text-sm">
            <p>Envoyez le montant exact via :</p>
            
            <div className="space-y-3">
              <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm border border-orange-500/30">
                <p className="text-xs text-orange-300 font-bold uppercase mb-1">Orange Money</p>
                <p className="text-2xl font-mono font-bold text-white tracking-wider">70 73 45 23</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm border border-blue-500/30">
                <p className="text-xs text-blue-300 font-bold uppercase mb-1">Moov Money</p>
                <p className="text-2xl font-mono font-bold text-white tracking-wider">98 31 21 31</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-blue-500/20 p-3 rounded-lg border border-blue-500/30">
              <MessageCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">
                <span className="font-bold text-blue-300">Important :</span> Vous recevrez votre code de connexion par SMS immédiatement après la validation du paiement.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 px-4 mt-8">
        <div className="max-w-md mx-auto text-center space-y-6">
          <a 
            href="https://wa.me/22370734523" 
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-green-50 text-green-700 font-bold rounded-xl border border-green-200 hover:bg-green-100 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Contactez-nous sur WhatsApp
          </a>
          
          <div className="space-y-2">
            <p className="text-xs text-slate-400 font-medium">
              Réseau géré par <span className="text-slate-600 font-bold">MikroTik</span> & <span className="text-slate-600 font-bold">Starlink</span>
            </p>
            <p className="text-[10px] text-slate-300">
              © {new Date().getFullYear()} WIFI DAMOU. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

