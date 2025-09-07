/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

type View = 'home' | 'experience' | 'post-experience' | 'manifesto' | 'contribute' | 'journal' | 'gentle-questions' | 'secret';

const ProgressRing = ({ duration, onComplete }) => {
    const [secondsLeft, setSecondsLeft] = useState(duration);
    const radius = 60;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        if (secondsLeft <= 0) {
            onComplete();
            return;
        }
        const timer = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [secondsLeft, onComplete]);

    const progress = ((duration - secondsLeft) / duration);
    const offset = circumference - (progress * circumference);

    return (
        <div className="progress-ring-container" aria-live="polite">
            <svg className="progress-ring-svg" width="150" height="150" viewBox="0 0 150 150">
                <circle
                    className="progress-ring-circle--background"
                    strokeWidth="8"
                    stroke="rgba(255, 255, 255, 0.2)"
                    fill="transparent"
                    r={radius}
                    cx="75"
                    cy="75"
                />
                <circle
                    className="progress-ring-circle--progress"
                    strokeWidth="8"
                    stroke="var(--accent-color-gold)"
                    fill="transparent"
                    r={radius}
                    cx="75"
                    cy="75"
                    style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
                />
            </svg>
            <span className="progress-ring-text">{secondsLeft}</span>
        </div>
    );
};

const ManifestoView = ({ setView }) => (
    <div className="page-view">
        <a onClick={() => setView('post-experience')} className="back-link">← Voltar</a>
        <div className="page-content">
            <h1>O Resgate da Presença</h1>
            <h2>Um convite para voltar a você.</h2>
            <p>Não estamos aqui para te distrair. Estamos aqui para te devolver.</p>
            <p>Em um mundo que grita por sua atenção, nós sussurramos por sua alma. Este não é um site. É uma pausa. Um refúgio. Um lembrete de que a vida acontece no espaço entre o inspirar e o expirar.</p>
            <p>Convidamos você a deixar o ruído lá fora e a encontrar o silêncio aqui dentro. Por 60 segundos. Por uma respiração. Por um momento.</p>
            <p className="signature">Assinado pelos guardiões da presença.</p>
            
            <form className="page-form" onSubmit={(e) => e.preventDefault()}>
                <h3>Quer assinar também?</h3>
                <label htmlFor="name-manifesto">Seu nome</label>
                <input type="text" id="name-manifesto" name="name" placeholder="Seu nome" required />
                
                <label htmlFor="email-manifesto">Seu e-mail</label>
                <input type="email" id="email-manifesto" name="email" placeholder="Seu e-mail" required />
                
                <label htmlFor="reason">Minha presença importa porque... (opcional)</label>
                <textarea id="reason" name="reason" rows={3} placeholder="...ela me conecta com o que é real."></textarea>
                
                <button type="submit" className="cta-button form-button">Eu me comprometo a estar presente</button>
            </form>
        </div>
    </div>
);

const ContributeView = ({ setView }) => (
    <div className="page-view">
        <a onClick={() => setView('post-experience')} className="back-link">← Voltar</a>
        <div className="page-content">
            <h1>Construa com a gente</h1>
            <h2>Seu talento importa.</h2>
            <p>Designer? Desenvolvedor? Poeta? Terapeuta? Sua presença é o código que falta.</p>
            <p>Acreditamos que a presença é construída em comunidade. Se você sente o chamado para contribuir com seu tempo, talento ou sabedoria, este é o seu convite.</p>

            <form className="page-form" onSubmit={(e) => e.preventDefault()}>
                <h3>Quero contribuir com minhas mãos</h3>
                 <label htmlFor="name-contribute">Seu nome</label>
                <input type="text" id="name-contribute" name="name" placeholder="Seu nome" required />
                
                <label htmlFor="email-contribute">Seu e-mail</label>
                <input type="email" id="email-contribute" name="email" placeholder="Seu e-mail" required />
                
                <label htmlFor="skills">Minhas habilidades e talentos</label>
                <textarea id="skills" name="skills" rows={3} placeholder="Ex: Sou designer e posso ajudar com a identidade visual..."></textarea>
                
                <label htmlFor="intention">Minha intenção ao contribuir</label>
                <textarea id="intention" name="intention" rows={3} placeholder="Ex: Quero ajudar a criar mais espaços de calma na internet..."></textarea>

                <button type="submit" className="cta-button form-button">Enviar minha contribuição</button>
            </form>
        </div>
    </div>
);

const JournalView = ({ setView }) => (
    <div className="page-view">
        <a onClick={() => setView('post-experience')} className="back-link">← Voltar</a>
        <div className="page-content">
            <h1>Diário dos Resgatados</h1>
            <h2>Histórias que respiram.</h2>
            
            <div className="journal-grid">
                <div className="journal-card">
                    <blockquote>“Hoje, pela primeira vez em 3 anos, senti o gosto do café.”</blockquote>
                    <footer>— Ana, 34</footer>
                </div>
                 <div className="journal-card">
                    <blockquote>“Chorei ouvindo o áudio do dia 3. Não de tristeza — de alívio.”</blockquote>
                    <footer>— Marcos, 28</footer>
                </div>
                 <div className="journal-card">
                    <blockquote>“Meu filho me viu parar. E perguntou: ‘Mãe, o que você está sentindo?’”</blockquote>
                    <footer>— Carla, 41</footer>
                </div>
            </div>

            <form className="page-form" onSubmit={(e) => e.preventDefault()}>
                <h3>Quer compartilhar sua história? Ela pode salvar alguém.</h3>
                <label htmlFor="name-journal">Seu nome e idade (Ex: Maria, 29)</label>
                <input type="text" id="name-journal" name="name" placeholder="Seu nome e idade" required />
                
                <label htmlFor="story">Sua história</label>
                <textarea id="story" name="story" rows={4} placeholder="Compartilhe um momento em que você se sentiu presente..."></textarea>
                
                <button type="submit" className="cta-button form-button">Enviar minha história</button>
            </form>
        </div>
    </div>
);

const GentleQuestionsView = ({ setView }) => (
    <div className="page-view">
        <a onClick={() => setView('post-experience')} className="back-link">← Voltar</a>
        <div className="page-content">
            <h1>Perguntas Suaves</h1>
            <h2>O que seu coração precisa saber.</h2>
            
            <div className="qa-section">
                <div className="qa-pair">
                    <h3 className="qa-question">Isso é religião?</h3>
                    <p className="qa-answer">Não. É humanidade.</p>
                </div>
                <div className="qa-pair">
                    <h3 className="qa-question">Preciso pagar?</h3>
                    <p className="qa-answer">Não. Mas se quiser sustentar, há opção consciente.</p>
                </div>
                <div className="qa-pair">
                    <h3 className="qa-question">Vai me cobrar algo?</h3>
                    <p className="qa-answer">Só sua presença. E só quando você puder.</p>
                </div>
                 <div className="qa-pair">
                    <h3 className="qa-question">Como isso é diferente de outros apps?</h3>
                    <p className="qa-answer">Aqui, o algoritmo te protege — não te vicia.</p>
                </div>
            </div>
        </div>
    </div>
);

const poems = [
    "A vida é a arte de desenhar sem borracha. — Millôr Fernandes",
    "Somos o que fazemos, mas somos, principalmente, o que fazemos para mudar o que somos. — Eduardo Galeano",
    "O que a memória ama, fica eterno. — Adélia Prado",
    "Você não está sozinho. Eu também estou aprendendo a voltar.",
    "Onde a vida acontece? Entre uma respiração e outra."
];

const SecretView = ({ setView }) => {
    const [poem] = useState(() => poems[Math.floor(Math.random() * poems.length)]);

    return (
        <div className="page-view secret-view">
            <a onClick={() => setView('home')} className="back-link">← Voltar</a>
            <div className="page-content secret-content">
                <p className="secret-poem">{poem}</p>
            </div>
        </div>
    );
};


const App = () => {
    const [view, setView] = useState<View>('home');
    const audioRef = useRef<HTMLAudioElement>(null);
    const [clickCount, setClickCount] = useState(0);
    const [keySequence, setKeySequence] = useState('');
    const targetSequence = 'respira';

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.length > 1) return; // Ignore keys like Shift, Ctrl, etc.
            const newSequence = (keySequence + e.key.toLowerCase()).slice(-targetSequence.length);
            setKeySequence(newSequence);
            if (newSequence === targetSequence) {
                setView('secret');
                setKeySequence('');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [keySequence]);

    const handleFooterClick = () => {
        const newClickCount = clickCount + 1;
        setClickCount(newClickCount);
        if (newClickCount >= 3) {
            setView('secret');
            setClickCount(0);
        }
    };
    
    const handleStartExperience = () => {
        setView('experience');
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    };

    const handleExperienceComplete = () => {
        setView('post-experience');
    };

    const renderView = () => {
        switch(view) {
            case 'manifesto':
                return <ManifestoView setView={setView} />;
            case 'contribute':
                return <ContributeView setView={setView} />;
            case 'journal':
                return <JournalView setView={setView} />;
            case 'gentle-questions':
                return <GentleQuestionsView setView={setView} />;
            case 'secret':
                return <SecretView setView={setView} />;
            default:
                return (
                    <div className="app-main">
                        <video 
                            className="video-background" 
                            autoPlay 
                            loop 
                            muted 
                            playsInline
                            aria-label="Vídeo de fundo com folhas de uma árvore balançando suavemente ao vento."
                        >
                            <source src="https://storage.coverr.co/videos/coverr-calm-river-774/1080p.mp4" type="video/mp4" />
                            Seu navegador não suporta a tag de vídeo.
                        </video>
                        <div className="overlay"></div>
                        
                        <main className="content-container">
                            {view === 'home' && (
                                <div className="welcome-view">
                                    <h2 className="hero-title">Você está vivo?<br />Então pare. Respire. Volte.</h2>
                                    <button onClick={handleStartExperience} className="cta-button">
                                        Comece seu resgate — 60 segundos agora.
                                    </button>
                                </div>
                            )}
                            {view === 'experience' && (
                                <div className="experience-view">
                                    <h3 className="experience-prompt">Apenas respire...</h3>
                                    <ProgressRing duration={60} onComplete={handleExperienceComplete} />
                                </div>
                            )}
                             {view === 'post-experience' && (
                                <div className="post-experience-view">
                                    <h2 className="hero-title">O que você deseja fazer agora?</h2>
                                    <div className="choice-buttons">
                                        <button onClick={() => setView('home')} className="cta-button">Respirar novamente</button>
                                        <button onClick={() => setView('manifesto')} className="cta-button">Entenda o porquê</button>
                                        <button onClick={() => setView('contribute')} className="cta-button">Construa com a gente</button>
                                        <button onClick={() => setView('journal')} className="cta-button">Diário dos Resgatados</button>
                                        <button onClick={() => setView('gentle-questions')} className="cta-button">Perguntas Suaves</button>
                                    </div>
                                </div>
                            )}
                        </main>
                        
                        <footer className="footer" onClick={handleFooterClick} role="button" tabIndex={0} aria-label="Ativar segredo">
                            <p>"Onde a vida acontece — entre uma respiração e outra."</p>
                        </footer>
                    </div>
                );
        }
    };

    return (
        <>
            {renderView()}
            <audio ref={audioRef} onEnded={handleExperienceComplete} preload="auto">
                <source src="https://cdn.pixabay.com/audio/2024/05/15/audio_19191191a2.mp3" type="audio/mpeg" />
                Seu navegador não suporta o elemento de áudio.
            </audio>
        </>
    );
};

const rootEl = document.getElementById('root');
if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(<React.StrictMode><App /></React.StrictMode>);
}