document.addEventListener('DOMContentLoaded', function() {

  const startButton = document.getElementById('start-button');
  const audio = document.getElementById('respiracao-audio');

  if (startButton && audio) {
    startButton.addEventListener('click', function() {
      audio.play().catch(e => {
        alert("Toque novamente — seu navegador precisa de permissão de áudio.");
      });
      startButton.textContent = "Respirando com você... 🌬️";
      startButton.disabled = true;

      setTimeout(() => {
        alert("✨ Você acabou de resgatar 60 segundos de presença. Bem-vindo de volta.");
        window.location.href = "participar.html";
      }, 60000);
    });
  }

  // Lembrete de inatividade
  let idleTimer;
  function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      const reminder = document.createElement('div');
      reminder.innerHTML = `<div style="
        position: fixed; 
        bottom: 20px; 
        right: 20px; 
        background: rgba(39, 174, 96, 0.95); 
        color: white; 
        padding: 15px 20px; 
        border-radius: 10px; 
        font-size: 0.9rem; 
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: fadeIn 0.5s ease;
      ">Está tudo bem parar. Respira. Estamos aqui. ❤️</div>`;

      document.body.appendChild(reminder);

      setTimeout(() => {
        reminder.style.opacity = '0';
        reminder.style.transition = 'opacity 1s';
        setTimeout(() => reminder.remove(), 1000);
      }, 5000);
    }, 10000);
  }

  document.addEventListener('mousemove', resetIdleTimer);
  document.addEventListener('keypress', resetIdleTimer);
  resetIdleTimer();
});
