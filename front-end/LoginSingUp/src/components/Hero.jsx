import avatar from '../assets/avatar.webp'
import { profile } from '../content'

export default function Hero() {
  return (
    <section className="hero" id="apresentacao" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__text">
          <h1 id="hero-title" className="hero__title">
            {profile.headline}
          </h1>
          <p className="hero__lead">{profile.lead}</p>

          {profile.about.map((paragraph) => (
            <p key={paragraph} className="hero__about">
              {paragraph}
            </p>
          ))}

          <ul className="tags" aria-label="Tecnologias que estudo e uso">
            {profile.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>

          <a className="btn btn--primary hero__cta" href="#acesso">
            Ir para o login
          </a>
        </div>

        {/* Imagem no topo da página: sem lazy loading. width/height evitam salto de layout. */}
        <figure className="hero__figure">
          <img src={avatar} width="400" height="480" alt={profile.avatarAlt} />
        </figure>
      </div>
    </section>
  )
}