// Öğrenci (kayıt) işlemleri için kullanılan servis
const postAPI = async (
  URL,
  body = null, // DELETE isteğinde body eklemeye gerek yok
  method = "POST",
  headers = { "Content-Type": "application/json" }
) => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL || !URL) {
      throw new Error("URL bulunamadı!");
    }

    const options = {
      method: method,
      headers: headers,
      cache: "no-store",
    };

    // Sadece body varsa ekle (DELETE isteğinde body gönderilmez)
    if (body && method !== "DELETE") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL + URL}`,
      options
    );

    if (response.redirected) {
      window.location.href = response.url;
      return;
    }

    return await response.json();
  } catch (err) {
    throw new Error(`API request failed: ${err}`);
  }
};

// Öğrenci (kayıt) işlemleri için kullanılan servis
const getAPI = async (
  URL,
  headers = { "Content-Type": "application/json" }
) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
    method: "GET",
    headers: headers,
    cache: "no-store",
  })
    .then((res) => {
      if (res.redirected) {
        // bazı yerlerde window'u bulamıyor kontrol et
        //return window.location.href = res.url;
      } else {
        return res.json();
      }
    })
    .catch((err) => console.log(err));

  return data;
};

const updateAPI = async (
  URL,
  body = null,
  headers = { "Content-Type": "application/json" }
) => {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  console.log("Updating API URL:", `${process.env.NEXT_PUBLIC_API_URL}${URL}`);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${URL}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(body),
    cache: "no-store",
  });

  // Yönlendirme kontrolü
  if (response.redirected) {
    window.location.href = response.url;
  } else if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "An error occurred while updating data."
    );
  }

  return response.json();
};

export { postAPI, getAPI, updateAPI };
