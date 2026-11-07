// src/scripts/form.ts
const form = document.getElementById('lead-form-el') as HTMLFormElement | null;
const status = document.getElementById('form-status');
const endpoint = import.meta.env.PUBLIC_APPS_SCRIPT_URL;

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  const formData = new FormData(form);
  
  // Cek honeypot (jika diisi bot, hentikan diam-diam)
  if (formData.get('website')) {
    return;
  }

  if (status) {
    status.textContent = 'Submitting...';
    status.className = 'text-sm font-medium text-slate-500';
  }

  try {
    // Kirim sebagai URLSearchParams (bukan JSON) untuk menghindari Preflight yang ketat
    const res = await fetch(endpoint!, {
      method: 'POST',
      body: new URLSearchParams(formData as any), 
    });
    
    const text = await res.text();
    
    // Cek respon dari Apps Script
    if (text.includes('"status":"ok"') || text.includes('ok')) {
      if (status) {
        status.textContent = 'Thanks! We will be in touch.';
        status.className = 'text-sm font-medium text-green-600';
      }
      form.reset();
    } else {
      throw new Error('Response not OK');
    }
  } catch (err) {
    console.error(err);
    if (status) {
      status.textContent = 'Something went wrong. Please try again.';
      status.className = 'text-sm font-medium text-red-600';
    }
  }
});