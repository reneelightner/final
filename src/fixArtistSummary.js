
export default function fixArtistSummary(artist, summary) {
    switch (artist) {
      case 'Chris Brown': {
        summary = summary.split('There is more than one artist with this name:\n\n1)');
        return summary[1];
      }
      case 'Creed': {
        summary = summary.split('A German metal band\n\n');
        return summary[1];
      }
      case 'Eve': {
        summary = summary.split('EVE - Brazilian girl group\n\n1.');
        return summary[1];
      }
      case 'John Mayer': {
        summary = summary.split('Indo Jazz Fusions\n\n1)');
        return summary[1];
      }
      case 'Next': {
        summary = summary.split('A Japanese hardcore/"melodicore"/"screamo" band\n\n1.-');
        return summary[1];
      }
      case 'Nirvana': {
        summary = summary.split('listed in order of prominence:\n\n1)');
        return summary[1];
      }
      case 'Roger Miller': {
        summary = summary.split('songwriter from Massachusetts, USA\n\n1)');
        return summary[1];
      }
      case 'The Cars': {
        summary = summary.split('There is more than one artist with this name:\n\n1)');
        return summary[1];
      }
      case 'Zayn': {
        summary = summary.split('There are two artists with this name:\n\n1.)');
        return summary[1];
      }
    }
  }