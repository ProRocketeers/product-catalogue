import { DataSource } from 'typeorm'
import { Product } from '../../entities/product.entity'

function avatarUrl(params: Record<string, string>): string {
  const searchParams = new URLSearchParams({ avatarStyle: 'Circle', ...params })
  return `https://avataaars.io/?${searchParams.toString()}`
}

const avatars: Record<string, string> = {
  'Ondřej Sýkora': avatarUrl({ topType: 'ShortHairShortFlat', accessoriesType: 'Blank', hairColor: 'Brown', facialHairType: 'BeardMedium', facialHairColor: 'Brown', clotheType: 'ShirtCrewNeck', clotheColor: 'Blue03', eyeType: 'Happy', eyebrowType: 'DefaultNatural', mouthType: 'Smile', skinColor: 'Light' }),
  'Roman Hvizdak': avatarUrl({ topType: 'NoHair', accessoriesType: 'Prescription02', hairColor: 'none', facialHairType: 'none', clotheType: 'ShirtCrewNeck', clotheColor: 'Gray02', eyeType: 'Happy', eyebrowType: 'DefaultNatural', mouthType: 'Smile', skinColor: 'Light' }),
  'Jan Breitkopf': avatarUrl({ topType: 'ShortHairShortWaved', accessoriesType: 'Blank', hairColor: 'Brown', facialHairType: 'Blank', clotheType: 'ShirtCrewNeck', clotheColor: 'Blue02', eyeType: 'Happy', eyebrowType: 'Default', mouthType: 'Smile', skinColor: 'Light' }),
  'Jakub Kleberc': avatarUrl({ topType: 'ShortHairShortFlat', accessoriesType: 'Prescription02', hairColor: 'Black', facialHairType: 'BeardMedium', facialHairColor: 'Black', clotheType: 'ShirtCrewNeck', clotheColor: 'White', eyeType: 'Default', eyebrowType: 'DefaultNatural', mouthType: 'Smile', skinColor: 'Light' }),
  'Lukáš Stuchlík': avatarUrl({ topType: 'ShortHairShortWaved', accessoriesType: 'Blank', hairColor: 'Brown', facialHairType: 'Blank', clotheType: 'ShirtCrewNeck', clotheColor: 'Gray02', eyeType: 'Happy', eyebrowType: 'DefaultNatural', mouthType: 'Smile', skinColor: 'Light' }),
  'Patrik Ludvik': avatarUrl({ topType: 'ShortHairShortFlat', accessoriesType: 'Prescription01', hairColor: 'Blonde', facialHairType: 'Blank', clotheType: 'Hoodie', clotheColor: 'Black', eyeType: 'Happy', eyebrowType: 'Default', mouthType: 'Smile', skinColor: 'Light' }),
  'Vojtěch Jíra': avatarUrl({ topType: 'ShortHairShortFlat', accessoriesType: 'Prescription02', hairColor: 'BrownDark', facialHairType: 'BeardMedium', facialHairColor: 'BrownDark', clotheType: 'ShirtCrewNeck', clotheColor: 'Black', eyeType: 'Happy', eyebrowType: 'DefaultNatural', mouthType: 'Smile', skinColor: 'Light' }),
}

export class ProductSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const productRepository = dataSource.getRepository(Product)

    const existingProducts = await productRepository.count()
    if (existingProducts > 0) {
      console.log('⏭️  Products already exist, skipping seed...')
      return
    }

    const products = [
      {
        name: 'PDF Generátor',
        description: 'Generátor PDF dle šablon a vyplněných hodnot proměnných',
        extendedDescription: 'PDF Generátor je open-source nástroj pro vytváření PDF dokumentů na základě předdefinovaných šablon. Umožňuje dynamické vyplňování proměnných a generování profesionálních dokumentů s minimálním úsilím.',
        url: 'https://github.com/ProRocketeers/pdf-generator',
        icon: 'P',
        category: 'Nástroje',
        tags: ['PDF', 'Generátor', 'Šablony', 'Dokumenty'],
        heroImage: undefined,
        features: [
          {
            title: 'Šablony na míru',
            description: 'Vytvářejte vlastní šablony PDF dokumentů s dynamickými proměnnými a podmíněným obsahem.'
          },
          {
            title: 'Rychlé generování',
            description: 'Generujte PDF dokumenty během několika sekund díky optimalizovanému zpracování.'
          },
          {
            title: 'Profesionální vzhled',
            description: 'Vytvářejte dokumenty s profesionálním designem a formátováním.'
          },
          {
            title: 'API integrace',
            description: 'Snadno integrujte do vašich aplikací pomocí REST API rozhraní.'
          },
          {
            title: 'Bezpečné',
            description: 'Všechna data jsou zpracovávána bezpečně s podporou šifrování.'
          },
          {
            title: 'Open Source',
            description: 'Plně open-source řešení s aktivní komunitou a pravidelnou podporou.'
          }
        ],
        teamMembers: [
          { name: 'Ondřej Sýkora', role: 'Lead Developer', avatar: avatars['Ondřej Sýkora'] },
          { name: 'Roman Hvizdak', role: 'Backend Developer', avatar: avatars['Roman Hvizdak'] },
          { name: 'Jan Breitkopf', role: 'Full Stack Developer', avatar: avatars['Jan Breitkopf'] },
          { name: 'Jakub Kleberc', role: 'DevOps Engineer', avatar: avatars['Jakub Kleberc'] }
        ],
        teamDescription: 'Náš tým zkušených vývojářů a designérů pracuje na vytváření nejlepších nástrojů pro generování PDF dokumentů. Věříme v open-source a komunitní přístup k vývoji softwaru.'
      },
      {
        name: 'URL Shortener',
        description: 'Zkracovač URL se statistikami o kliknutích',
        extendedDescription: 'URL Shortener je moderní nástroj pro zkracování dlouhých URL adres s pokročilými analytickými funkcemi. Sledujte kliknutí, geografickou polohu návštěvníků a další statistiky v reálném čase.',
        url: 'https://github.com/ProRocketeers/url-shortener',
        icon: 'U',
        category: 'Nástroje',
        tags: ['URL', 'Zkracovač', 'Analytika', 'Statistiky'],
        heroImage: undefined,
        features: [
          {
            title: 'Zkrácení URL',
            description: 'Zkraťte dlouhé URL adresy na krátké, snadno zapamatovatelné odkazy.'
          },
          {
            title: 'Detailní statistiky',
            description: 'Sledujte počet kliknutí, geografickou polohu a další metriky v reálném čase.'
          },
          {
            title: 'Vlastní aliasy',
            description: 'Vytvářejte vlastní krátké URL s přizpůsobenými názvy pro lepší branding.'
          },
          {
            title: 'Heslem chráněné odkazy',
            description: 'Chraňte své odkazy heslem pro zvýšenou bezpečnost.'
          },
          {
            title: 'Časově omezené odkazy',
            description: 'Nastavte datum vypršení platnosti pro dočasné odkazy.'
          },
          {
            title: 'QR kódy',
            description: 'Automaticky generujte QR kódy pro každý zkrácený odkaz.'
          }
        ],
        teamMembers: [
          { name: 'Lukáš Stuchlík', role: 'Full Stack Developer', avatar: avatars['Lukáš Stuchlík'] },
          { name: 'Ondřej Sýkora', role: 'Lead Developer', avatar: avatars['Ondřej Sýkora'] }
        ],
        teamDescription: 'Specializujeme se na vytváření nástrojů pro správu a analýzu URL adres. Náš tým kombinuje technickou expertízu s uživatelsky přívětivým designem.'
      },
      {
        name: 'QR Generator',
        description: 'Generátor QR kódů',
        extendedDescription: 'QR Generator je výkonný nástroj pro vytváření QR kódů s podporou různých typů dat, barev a stylů. Ideální pro marketing, platby, kontaktní informace a mnoho dalšího.',
        url: 'https://github.com/ProRocketeers/qr-generator',
        icon: 'Q',
        category: 'Nástroje',
        tags: ['QR', 'Generátor', 'Kódy', 'Marketing'],
        heroImage: undefined,
        features: [
          {
            title: 'Různé typy QR kódů',
            description: 'Vytvářejte QR kódy pro URL, text, email, telefon, WiFi a mnoho dalšího.'
          },
          {
            title: 'Vlastní design',
            description: 'Přizpůsobte barvy, tvar a logo vašich QR kódů podle vašeho brandingu.'
          },
          {
            title: 'Sledování skenování',
            description: 'Sledujte, kolikrát byl váš QR kód naskenován a odkud.'
          },
          {
            title: 'Různé formáty',
            description: 'Stahujte QR kódy v PNG, SVG, PDF nebo jiných formátech.'
          },
          {
            title: 'API přístup',
            description: 'Integrujte generování QR kódů do vašich aplikací pomocí API.'
          },
          {
            title: 'Rychlé generování',
            description: 'Vytvářejte QR kódy okamžitě bez čekání nebo registrace.'
          }
        ],
        teamMembers: [
          { name: 'Ondřej Sýkora', role: 'Lead Developer', avatar: avatars['Ondřej Sýkora'] },
          { name: 'Patrik Ludvik', role: 'Full Stack Developer', avatar: avatars['Patrik Ludvik'] }
        ],
        teamDescription: 'Jsme tým nadšenců pro QR technologie a mobilní marketing. Naším cílem je poskytovat nejlepší nástroje pro generování a správu QR kódů.'
      },
      {
        name: 'QA Workplayground',
        description: 'Flexibilní základ pro automatizované testování',
        extendedDescription: 'QA Workplayground je komplexní framework pro automatizované testování webových aplikací s využitím Playwright a Cypress. Poskytuje strukturu, best practices a užitečné utility pro efektivní testování.',
        url: 'https://github.com/ProRocketeers/qa-workplayground',
        icon: 'Q',
        category: 'Testování',
        tags: ['QA', 'Testování', 'Playwright', 'Cypress', 'Automatizace'],
        heroImage: undefined,
        features: [
          {
            title: 'Playwright & Cypress',
            description: 'Podpora pro oba nejpopulárnější testovací frameworky s jednotnou strukturou.'
          },
          {
            title: 'Připravené utility',
            description: 'Sada užitečných pomocných funkcí pro běžné testovací scénáře.'
          },
          {
            title: 'Reporting',
            description: 'Detailní reporty s screenshoty, videi a logováním pro snadné debugování.'
          },
          {
            title: 'CI/CD integrace',
            description: 'Připravené konfigurace pro GitHub Actions, GitLab CI a další platformy.'
          },
          {
            title: 'Best practices',
            description: 'Implementace osvědčených postupů pro psaní udržitelných testů.'
          },
          {
            title: 'Paralelní běh',
            description: 'Spouštějte testy paralelně pro rychlejší zpětnou vazbu.'
          }
        ],
        teamMembers: [
          { name: 'Ondřej Sýkora', role: 'Lead Developer', avatar: avatars['Ondřej Sýkora'] },
          { name: 'Vojtěch Jíra', role: 'QA Engineer', avatar: avatars['Vojtěch Jíra'] }
        ],
        teamDescription: 'Náš QA tým se zaměřuje na vytváření robustních testovacích frameworků a nástrojů. Věříme v automatizaci a kontinuální zlepšování kvality softwaru.'
      }
    ]

    const createdProducts = await productRepository.save(products)
    console.log(`✅ Successfully seeded ${createdProducts.length} products!`)
  }
}
