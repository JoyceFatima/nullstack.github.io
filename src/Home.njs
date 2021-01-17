import Nullstack from 'nullstack';
import Snippet from './Snippet';
import Cog from 'poisonicon/cog/stroke';
import Heartbeat from 'poisonicon/heartbeat/stroke';
import QRCode from 'poisonicon/qrcode/stroke';
import {readFileSync} from 'fs';
import YAML from 'yaml';

class Home extends Nullstack {

  i18n = {};

  static async geti18nByLocale({locale}) {
    const file = readFileSync(`i18n/${locale}/pages/Home.yml`, 'utf-8');
    return YAML.parse(file);
  }

  async initiate({project, page, locale}) {
    this.i18n = await this.geti18nByLocale({locale});
    page.title = `${project.name} - ${this.i18n.title}`;
    page.description = this.i18n.description;
    page.priority = 1;
    page.locale = locale || 'en-US';
  }

  renderHero() {
    if(!this.i18n.hero) return false;
    return (
      <section class="x xx sm-p2x p20y">
        <h1 class="x12 sm-fs8 md+fs12"> {this.i18n.hero.heading} </h1>
        <div class="xx x8 m12b" style="background-image: linear-gradient(0deg, #fff 49%, #e2e8f0 50%, #fff 52%);"> 
          <p class="bgm1 fs6 p2"> {this.i18n.hero.tagline} </p>
        </div>
        <div>
          {this.i18n.hero.paragraphs.map((paragraph, index, paragraphs) => 
            <p class={`x12 fs4 lh12 ls12 ${index == paragraphs.length - 1 ? 'm4t' : ''}`} html={paragraph} />
          )}
        </div>
      </section>
    )
  }

  renderStep({locale, title, text, link, icon: Icon}) {
    const prefix = locale != 'en-US' ? locale.toLowerCase() : '';
    return (
      <div class="md+x4 p1">
        <div class="xx bgm2 p8y p4x y12">
          <Icon height={40} class="cm2z m4b" />
          <h2 class="x12 fs6">
            <a href={prefix + link} class="ci1">{title}</a>
          </h2>
          <p class="x12 fs4 m4y" html={text} />
        </div>
      </div>
    )
  }

  renderCycle() {
    if(!this.i18n.cycle) return false;
    return (
      <section class="x xx sm-p2x md+bcm2y md+p10y">
        <Step icon={Cog} title={this.i18n.cycle.cog.title} link="/server-side-rendering" text={this.i18n.cycle.cog.text} />
        <Step icon={Heartbeat} title={this.i18n.cycle.heartbeat.title} link="/full-stack-lifecycle" text={this.i18n.cycle.heartbeat.text} />
        <Step icon={QRCode} title={this.i18n.cycle.qrcode.title} link="/static-site-generation" text={this.i18n.cycle.qrcode.text} />
      </section>
    )
  }

  renderAbout() {
    if(!this.i18n.about) return false;
    return (
      <section class="x xx sm-p2x sm-p10y md+p20t md+p10b">
        <h2 class="x12 sm-fs8 md+fs12 m2b"> {this.i18n.about.heading} </h2>
        {this.i18n.about.taglines.map((tagline) => <p class="x12 fs4" html={tagline} />)}
      </section>
    )
  }

  renderFeature({locale, title, key, link}) {
    const prefix = locale != 'en-US' ? locale.toLowerCase() : '';
    return (
      <div class="md-x12 lg+x6 p1">
        {!!title && 
          <div class="xsb bcm2 p4">
            <h3 class="ff2 fw3 fs4">
              <a href={prefix + link} class="ci1">{title}</a>
            </h3>
          </div>
        }
        <Snippet key={key} />
      </div>
    )
  }

  renderShowcase() {
    if(!this.i18n.showcase) return false;
    return (
      <section class="x lg-x12z xl md-p2x">
        <Feature key="Application" />
        <Feature key="TaskList" />
        <div class="xl x12 p1">
          <div class="xl x12 bcm2">
            {this.i18n.showcase.paragraphs.map((paragraph) => <p class="xx x12 m5t p4x lh16" html={paragraph} />)}
          </div>
        </div>
      </section>
    )
  }

  renderProductivity() {
    if(!this.i18n.productivity) return false;
    return (
      <section class="x xx sm-p2x sm-p10y md+p20y">
        <h2 class="x12 sm-fs8 md+fs12 m2b"> {this.i18n.productivity.heading} </h2>
        <p class="x12 fs4"> {this.i18n.productivity.tagline} </p>
      </section>
    )
  }

  renderFeatures() {
    if(!this.i18n.features) return false;
    return (
      <section class="x lg-x12z xl lg-p2x">
        <Feature 
          title={this.i18n.features.stateful}
          key="Stateful"
          link="/stateful-components"
        />
        <Feature 
          title={this.i18n.features.binding}
          key="Binding"
          link="/two-way-bindings"
        />
        <Feature 
          title={this.i18n.features.routes}
          key="Routes"
          link="/routes-and-params"
        />
        <Feature 
          title={this.i18n.features.lifecycle}
          key="Lifecycle"
          link="/full-stack-lifecycle"
        />
      </section>
    )
  }

  renderVideo({code, part}) {
    const title = `Full-stack with Nullstack - Part ${part}`;
    return (
      <div class="x12 md+x4 p1">
        <a href={`https://www.youtube.com/watch?v=${code}&list=PL5ylYELQy1hyFbguVaShp3XujjdVXLpId`} title={title} target="_blank" rel="noopener">
          <img src={`/thumb-0${part}.webp`} alt={title} height="209" width="372" loading="lazy" />
        </a>
      </div>
    )
  }

  renderPlaylist({worker}) {
    if(!worker.online) return false;
    return (
      <section class="x xx md+bcm2t sm-p10t md+p20t sm-p2x">
        <h2 class="x12 sm-fs8 md+fs12"> Watch our Nullstack video turorials </h2>
        <p class="x12 fs4"> Nullstack cares about making its content as direct to the point and easy to understand as possible </p>
        <div class="xl x12 p10t">
          <Video code="l23z00GEar8" part={1} />
          <Video code="_i5kKXkhBaM" part={2} />
          <Video code="8PExa5-G1As" part={3} />
        </div>
      </section>
    )
  }

  renderReason({title, description, closer, link}) {
    return (
      <div class="md+x6 p1">
        <div class="xx bgm2 p8y p4x y12">
          <Icon height={40} class="cm2z m4b" />
          <h3 class="x12 fs6">
            <a href={link} class="ci1">{title}</a>
          </h3>
          <p class="x12 fs4 m4y"> {description} </p>
          <strong>{closer}</strong>
        </div>
      </div>
    )
  }

  renderWhy() {
    if(!this.i18n.why) return false;
    return (
      <section class="sm-p2x sm-m10t md+m20t">
        <div class="x xx md+bcm2t p10y">
          <h2 class="x12 sm-fs8 md+fs12"> Why should you use Nullstack? </h2>
          <div class="xl p10y">
            {this.i18n.why.reasons.map((reason) => 
              <Reason 
                title={reason.title}
                description={reason.description}
                link={reason.link}
                closer={reason.closer}
              />
            )}
          </div>
          <a href={this.i18n.why.getStarted.link} class="bci1 cm1 ci1:h bgi1 bgm1:h p2y p4x"> {this.i18n.why.getStarted.text} </a>
          <span class="x12 fs4"> ╰(*°▽°*)╯ </span>
        </div>
      </section>
    )
  }
  
  render() {
    return (
      <div>
        <Hero />
        <Cycle />
        <About />
        <Showcase />
        <Productivity />
        <Features />
        <Playlist />
        <Why />
      </div>
    )
  }

}

export default Home;