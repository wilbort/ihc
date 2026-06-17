import asyncio
from playwright.async_api import async_playwright
import os

SCREENSHOTS_DIR = "D:/Proyectos/upn/ihc/screenshots"
BASE = "http://localhost:5173/ihc/"

os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

async def take(page, name, delay=500):
    await page.wait_for_timeout(delay)
    path = f"{SCREENSHOTS_DIR}/{name}.png"
    await page.screenshot(path=path, full_page=False)
    print(f"  -> {name}.png")

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 800})

        # 1. Login
        await page.goto(BASE)
        await take(page, "01_login")

        # --- PACIENTE ---
        print("== PACIENTE ==")
        await page.click('button:has-text("Paciente")')
        await take(page, "02_paciente_dashboard", 800)

        await page.click('a[href="#/patient/new-appointment"]')
        await take(page, "03_paciente_nueva_cita_especialidad", 800)

        # Select first specialty
        await page.click('button:has-text("Cardiología")')
        await take(page, "04_paciente_nueva_cita_doctor", 500)

        # Select first doctor
        btns = await page.query_selector_all('button:has-text("Seleccionar")')
        if btns:
            await btns[0].click()
        await take(page, "05_paciente_nueva_cita_horario", 500)

        # Go to My Appointments
        await page.click('a[href="#/patient/my-appointments"]')
        await take(page, "06_paciente_mis_citas", 800)

        # Go to History
        await page.click('a[href="#/patient/history"]')
        await take(page, "07_paciente_historial", 800)

        # Logout
        await page.click('button:has-text("Salir")')
        await take(page, "00_back_login", 500)

        # --- RECEPCIONISTA ---
        print("== RECEPCIONISTA ==")
        await page.click('button:has-text("Recepcionista")')
        await take(page, "08_recepcionista_dashboard", 800)

        await page.click('a[href="#/receptionist/register"]')
        await take(page, "09_recepcionista_registro", 800)

        await page.click('a[href="#/receptionist/search"]')
        await take(page, "10_recepcionista_buscar", 800)

        await page.click('a[href="#/receptionist/appointments"]')
        await take(page, "11_recepcionista_citas", 800)

        await page.click('a[href="#/receptionist/queue"]')
        await take(page, "12_recepcionista_cola", 800)

        # Logout
        await page.click('button:has-text("Salir")')
        await take(page, "00_back_login2", 500)

        # --- ADMIN ---
        print("== ADMIN ==")
        await page.click('button:has-text("Administrador")')
        await take(page, "13_admin_dashboard", 800)

        await browser.close()
        print("Done!")

asyncio.run(main())
