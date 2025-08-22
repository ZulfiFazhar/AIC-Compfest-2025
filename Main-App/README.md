This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Database

### Organization

| Nama Kolom        | Tipe Data    | Keterangan                                            |
| :---------------- | :----------- | :---------------------------------------------------- |
| id                | UUID         | Primary Key, identifier unik untuk organisasi.        |
| name              | VARCHAR(255) | Nama organisasi.                                      |
| subscription_plan | VARCHAR(50)  | Jenis langganan (misal: 'free', 'pro', 'enterprise'). |
| created_at        | TIMESTAMPTZ  | Waktu pembuatan record.                               |
| updated_at        | TIMESTAMPTZ  | Waktu pembaruan record.                               |

### Users

| Nama Kolom      | Tipe Data    | Keterangan                                             |
| :-------------- | :----------- | :----------------------------------------------------- |
| id              | UUID         | Primary Key.                                           |
| organization_id | UUID         | Foreign Key ke organizations.id.                       |
| name            | VARCHAR(255) | Nama lengkap pengguna.                                 |
| email           | VARCHAR(255) | Email pengguna, harus unik.                            |
| password_hash   | VARCHAR(255) | Hash dari password pengguna.                           |
| role            | VARCHAR(50)  | Peran pengguna (misal: 'admin', 'operator', 'viewer'). |
| created_at      | TIMESTAMPTZ  | Waktu pembuatan record.                                |
| updated_at      | TIMESTAMPTZ  | Waktu pembaruan record.                                |

### Cameras

| Nama Kolom      | Tipe Data    | Keterangan                                               |
| :-------------- | :----------- | :------------------------------------------------------- |
| id              | UUID         | Primary Key.                                             |
| organization_id | UUID         | Foreign Key ke organizations.id.                         |
| name            | VARCHAR(255) | Nama atau label kamera (misal: "Kamera Pintu Depan").    |
| location        | VARCHAR(255) | Deskripsi lokasi kamera.                                 |
| stream_url      | VARCHAR(255) | URL untuk mengakses feed video kamera.                   |
| status          | VARCHAR(50)  | Status kamera (misal: 'online', 'offline', 'recording'). |
| created_at      | TIMESTAMPTZ  | Waktu pembuatan record.                                  |
| updated_at      | TIMESTAMPTZ  | Waktu pembaruan record.                                  |

### Events

| Nama Kolom     | Tipe Data    | Keterangan                                                    |
| :------------- | :----------- | :------------------------------------------------------------ |
| id             | BIGSERIAL    | Primary Key, cocok untuk tabel yang sangat besar.             |
| camera_id      | UUID         | Foreign Key ke cameras.id.                                    |
| event_type     | VARCHAR(100) | Jenis kejadian (misal: 'motion_detected', 'person_detected'). |
| timestamp      | TIMESTAMPTZ  | Waktu pasti kejadian terjadi.                                 |
| metadata       | JSONB        | Data tambahan dalam format JSON (misal: koordinat deteksi).   |
| video_clip_url | VARCHAR(255) | (Opsional) Link ke klip video rekaman kejadian.               |

### Alerts

| Nama Kolom      | Tipe Data    | Keterangan                                                         |
| :-------------- | :----------- | :----------------------------------------------------------------- |
| id              | UUID         | Primary Key.                                                       |
| event_id        | BIGINT       | Foreign Key ke events.id yang memicu alert ini.                    |
| camera_id       | UUID         | Foreign Key ke cameras.id (denormalisasi untuk query lebih cepat). |
| threat_type     | VARCHAR(100) | Jenis ancaman (misal: 'intruder', 'unattended_package').           |
| severity        | VARCHAR(50)  | Tingkat kegawatan ('low', 'medium', 'high', 'critical').           |
| status          | VARCHAR(50)  | Status alert ('new', 'acknowledged', 'resolved').                  |
| acknowledged_by | UUID         | (Nullable) Foreign Key ke users.id yang menangani alert.           |
| acknowledged_at | TIMESTAMPTZ  | (Nullable) Waktu saat alert ditangani.                             |
| created_at      | TIMESTAMPTZ  | Waktu pembuatan record.                                            |
| updated_at      | TIMESTAMPTZ  | Waktu pembaruan record.                                            |
