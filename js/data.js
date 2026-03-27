// js/data.js
// 이 파일은 기존 데이터베이스(Supabase)를 대체하여 웹사이트에 직접 글과 사진 데이터를 저장합니다.
// 새로운 글이나 사진을 추가할 때 아래 배열(Array) 양식에 맞춰 추가해 주시면 즉각 반영됩니다.

export const writingsData = [
    {
        id: "essay-001",
        title: "첫 번째 기록 (예시 데이터)",
        date: "2026.03.27",
        content: "<p>이 곳은 에세이 내용이 들어가는 자리입니다. 기존 Supabase에 저장되어 있던 html 문법의 글 내용을 여기에 옮겨오시면 됩니다.</p><p>새로운 문단을 쓸 때는 &lt;p&gt; 태그를 활용해 주세요.</p>",
        created_at: "2026-03-27T00:00:00Z"
    },
    // 작성했던 기존 에세이들을 이 위에 계속 추가해 주세요.
];

export const photographyData = [
    {
        id: "photo-001",
        url: "https://images.unsplash.com/photo-1542385151-efd9000785a0?w=800&q=80", // 예시 사진
        title: "기억의 조각",
        caption: "첫 사진",
        content: "사진에 대한 자세한 이야기나 메모를 여기에 적을 수 있습니다.",
        created_at: "2026-03-27T00:00:00Z"
    },
    // 기존에 올리셨던 사진들의 URL과 내용을 이 위에 계속 추가해 주세요. (로컬 /assets 폴더의 이미지라면 'assets/이미지이름.jpg' 도 가능합니다)
];
