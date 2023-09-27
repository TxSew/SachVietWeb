export function formatDate(inputDate:any) {
    const options:any = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return new Date(inputDate).toLocaleDateString(undefined, options);
  }