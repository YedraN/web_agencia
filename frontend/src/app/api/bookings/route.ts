import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, topic, date, time, duration, timezone } = body;

    // Configurar la autenticación con el Service Account
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        // Reemplaza los saltos de línea escapados para que Node los lea correctamente
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar.events"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    // Construir la fecha exacta usando la fecha y la hora seleccionada
    // date viene como "2026-04-27T00:00:00.000Z"
    const dateString = date.split("T")[0];
    const startDateTime = new Date(`${dateString}T${time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

    // Definir la información del evento
    const event = {
      summary: `Llamada de Descubrimiento - ${name}`,
      description: `Nombre: ${name}\nEmail: ${email}\nTema: ${topic || "No especificado"}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: timezone,
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: timezone,
      },
      attendees: [{ email }], // Añade al cliente como invitado (Google le mandará un correo)
      conferenceData: {
        createRequest: {
          requestId: Math.random().toString(36).substring(7),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    // Insertar el evento en tu calendario
    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      conferenceDataVersion: 1, // Obligatorio para que se genere el link de Google Meet
      requestBody: event,
    });

    return NextResponse.json({
      success: true,
      eventLink: response.data.htmlLink,
      meetLink: response.data.hangoutLink,
    });
  } catch (error) {
    console.error("Error al crear el evento de Google Calendar:", error);
    return NextResponse.json(
      { error: "Error interno al crear la reserva" },
      { status: 500 }
    );
  }
}
